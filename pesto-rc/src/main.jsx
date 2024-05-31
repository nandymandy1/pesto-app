import { ApolloProvider } from "@apollo/client";
import client from "@services/apollo.js";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "@assets/scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
