import React, { useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  // use these hooks below
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = event => {
    // some fancy stripe stuff here
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
