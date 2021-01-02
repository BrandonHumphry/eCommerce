import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // if we have a user
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        // organize by date created in a descending order
        .orderBy("created", "desc")
        // gives us a realtime snapshot of the db and what it looks like
        .onSnapshot(snapshot =>
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))
          )
        );
      // if we don't have a user, set orders to an empty array
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
