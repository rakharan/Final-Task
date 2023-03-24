import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";
import Invoice from "./pages/Invoice";
import MyTicket from "./pages/MyTicket";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";
import Payment from "./pages/Payment";
import AddTicket from "./pages/AddTicket";
import TransactionList from "./pages/TransactionList";
const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // user redirect
  useEffect(() => {
    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
    if (state.user.role === "admin") {
      navigate("/admin");
    }
    if (state.user.role === "user") {
      navigate("/");
    }
    setAuthToken(localStorage.token);
  }, []);

  async function checkAuth() {
    try {
      // get auth response
      const response = await API.get("/auth");
      // get response data
      let payload = response.data.data;
      // post token to local storage
      payload.token = localStorage.token;
      // dispatch status
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      // change state loading
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      // check error if from network
      if (error.code === "ERR_NETWORK") {
        // dispatch status
        return (
          dispatch({ type: "AUTH_ERROR" }),
          setTimeout(() => {
            setIsLoading(false);
          }, 3000),
          alert("server is under maintenance"),
          navigate("/server-error")
        );
      }
      // check error auth response if from client side
      else if (error.response?.status >= 400 && error.response?.status <= 499) {
        // dispatch status
        return (
          dispatch({
            type: "AUTH_ERROR",
          }),
          setTimeout(() => {
            // change state loading
            setIsLoading(false),
              // redirect to homepage
              navigate("/");
          }, 3000)
        );
        // check error auth response if from server side
      } else if (
        error.response?.status >= 500 &&
        error.response?.status <= 599
      ) {
        // dispatch status
        return (
          dispatch({
            type: "AUTH_ERROR",
          }),
          // change state loading
          setIsLoading(false),
          // redirect to homepage
          navigate("/")
        );
      }
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/myTicket" element={<MyTicket />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin/addTicket" element={<AddTicket />} />
          <Route path="/admin/transactionList" element={<TransactionList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
