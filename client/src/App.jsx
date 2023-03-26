import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";
import MyTicket from "./pages/MyTicket";
import { UserContext } from "./context/UserContext";
import {
  PrivateRoute,
  PrivateRouteAdmin,
} from "./components/PrivateRoute/PrivateRoute";
import { API, setAuthToken } from "./config/api";
import Payment from "./pages/Payment";
import AddTicket from "./pages/AddTicket";
import TransactionList from "./pages/TransactionList";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AddStation from "./pages/AddStation";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    <>
      <>
        {isLoading ? (
          <>
            <div className="min-h-screen flex justify-center items-center loadingScreen">
              <div className="flex flex-col justify-center items-center">
                <LazyLoadImage
                  src="/assets/LandTickIcon.png"
                  alt="loading image"
                  width="200px"
                />
                <h1 className="text-2xl mt-4">LandTick</h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/myTicket" element={<MyTicket />} />
                  <Route path="/payment" element={<Payment />} />
                </Route>
                <Route path="/" element={<PrivateRouteAdmin />}>
                  <Route path="/admin/addStation" element={<AddStation />} />
                  <Route path="/admin/addTicket" element={<AddTicket />} />
                  <Route
                    path="/admin/transactionList"
                    element={<TransactionList />}
                  />
                </Route>
              </Route>
            </Routes>
          </>
        )}
      </>
    </>
  );
};

export default App;
