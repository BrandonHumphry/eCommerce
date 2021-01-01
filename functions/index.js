const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51I1nOeEomOUdbwLBPgXOpMimbuj8AZcNN1CKGTpK2UaMlCXAt4Bx4fW1gTZCqcZVes6z7n8D0LXRJC7xW3nnMznS00BKbVxOWB"
);

// API

// API - App Config
const app = express();
// API - Middleware
app.use(cors({ origin: true }));
// send data and pass in JSON format
app.use(express.json());
// API - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
// example test endpoint
app.get("/brandon", (request, response) =>
  response.status(200).send("keep learning!")
);
app.post("payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request received for this amount >>>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd"
  });
  // Response = OK, created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  });
});
// API - Listen command for cloud functions on https request
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/ecommerce-3f5ca/us-central1/api
