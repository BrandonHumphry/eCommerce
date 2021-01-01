import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  // use these hooks below
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate secret for stripe that allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects total in currencies subunits so ex: multiple by 100 to get .00
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async event => {
    // some fancy stripe stuff here
    // stop refreshing
    event.preventDefault();
    // only can click buy once and then it stops
    setProcessing(true);

    // you need to tell stripe (or any processing software you're using)
    // a client secret to let you know you want to send money
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        // when the order comes back successful, reach into the db of users
        db.collection("users")
          // to that specific user
          .doc(user?.uid)
          // to their orders
          .collection("orders")
          // create a document with a paymentIntent.id
          .doc(paymentIntent.id)
          // add this info below to it
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            create: paymentIntent.created
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // this dispatch is to empty the basket after order is placed, the type lives in reducer.js
        dispatch({
          type: "EMPTY_BASKET"
        });

        history.replace("/orders");
      });
  };

  const handleChange = event => {
    // listen for any changes in CardElement and display any errors as the customer types in their card details
    //  if the event is empty, then disable the button
    setDisabled(event.empty);
    // if there is an error, show the error message, otherwise show nothing
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length}items</Link>)
        </h1>

        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 react lane</p>
            <p>Orange,CA</p>
          </div>
        </div>
        {/* payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment__items">
            {/* products in basket will show here */}
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic goes here */}
            <form onSubmit={handleSubmit}>
              {/* CardElement comes from stripe, handle the change is a function I created for when the card changes */}
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={value => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displaytype={"text"}
                  thousandsSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
