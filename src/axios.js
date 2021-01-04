import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-ecommerce-3f5ca.cloudfunctions.net/api"

  // "http://localhost:5001/ecommerce-3f5ca/us-central1/api" The local API (cloud function) URL
});

export default instance;
