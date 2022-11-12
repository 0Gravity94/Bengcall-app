import React, { useState, useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";

import { TokenContext } from "../utils/context";
import { handleAuth } from "../utils/redux/reducers/reducer";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardAdmin from "../pages/DashboardAdmin";
import DetailCustomer from "../pages/DetailCustomer";
import History from "../pages/History";
import HomePage from "../pages/HomePage";
import MyProfile from "../pages/MyProfile";
import DetailAdmin from "../pages/DetailAdmin";
import ServiceTypeAdmin from "../pages/ServiceTypeAdmin";

axios.defaults.baseURL = "https://project-edu.online/";

function App() {
  const [cookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);
  const checkToken = cookie.token;
  const role = cookie.role;

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { data } = error.response;
      if (
        data === "Missing or malformed JWT" ||
        [401, 403].includes(data.code)
      ) {
        removeCookie("token");
      }
      return Promise.reject(error);
    }
  );

  (function () {
    if (checkToken) {
      const { token } = cookie;
      dispatch(handleAuth(true));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      dispatch(handleAuth(false));
      delete axios.defaults.headers.common["Authorization"];
    }
  })();

  return (
    <TokenContext.Provider value={jwtToken}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />

          <Route
            path="/login"
            element={
              checkToken ? (
                role === "1" ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              checkToken ? (
                role === "0" ? (
                  <HomePage />
                ) : (
                  <DashboardAdmin />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/myprofile"
            element={
              checkToken ? (
                role === "0" ? (
                  <MyProfile />
                ) : (
                  <DashboardAdmin />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/detail/:id"
            element={
              checkToken ? (
                role === "0" ? (
                  <DetailCustomer />
                ) : (
                  <DashboardAdmin />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/history"
            element={
              checkToken ? (
                role === "0" ? (
                  <History />
                ) : (
                  <DashboardAdmin />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              checkToken ? (
                role === "1" ? (
                  <DashboardAdmin />
                ) : (
                  <HomePage />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/detailadmin/:id"
            element={
              checkToken ? (
                role === "1" ? (
                  <DetailAdmin />
                ) : (
                  <HomePage />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/service-type"
            element={
              checkToken ? (
                role === "1" ? (
                  <ServiceTypeAdmin />
                ) : (
                  <HomePage />
                )
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
