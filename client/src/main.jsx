import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { GlobalProvider } from "./context/GlobalContext";
import { UserContextProvider } from "./context/UserContext";
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <GlobalProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
