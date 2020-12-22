import React from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="payment">
      <div className="payment__Container">
        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 react lane</p>
              <p>Orange,CA</p>
            </div>
          </div>
        </div>
        {/* payment section - review items */}
        <div className="payment__section"></div>
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
        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">{/* stripe magic goes here */}</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
