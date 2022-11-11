import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { handleAuth } from "../../utils/redux/reducers/reducer";
import { CustomInput } from "../../components/CustomInput";
import Button from "../../components/CustomButton";
import LogReg from "../../assets/LogReg.png";
import useTitle from "../../utils/useTitle";

function Login() {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useTitle("Login");

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    axios
      .post("login", body)
      .then((res) => {
        const { data, message } = res.data;
        setCookie("token", data.token, { path: "/" });
        setCookie("role", data.role, { path: "/" });
        dispatch(handleAuth(true));
        alert("You're logged in");
        if (data?.role === 1) {
          navigate("/dashboard");
        } else if (data?.role === 0) {
          navigate("/home");
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (email === "") {
          swal("Email should not be empty");
        } else if (password === "") {
          swal("Password should not be empty");
        } else if (err.response?.status === 500) {
          swal("Server error");
        } else if (err.response?.status === 400) {
          swal("Wrong Email or Password");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white">
      <div className="hidden md:flex lg:flex w-full h-full">
        <img src={LogReg} alt="Bengcall" className="w-full" />
      </div>
      <div className="flex flex-wrap justify-center w-full h-screen mt-28 px-2">
        <div>
          <h1 className="font-bold text-5xl text-center text-PrimaryBlue my-14">
            Sign In
          </h1>
          <div>
            <label className="font-semibold text-2xl text-PrimaryBlue">
              Email
            </label>
            <CustomInput
              name="email"
              id="email"
              type="email"
              className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input email"
              required
            />
            <br />
            <label className="font-semibold text-2xl text-PrimaryBlue">
              Password
            </label>
            <CustomInput
              id="password"
              type="password"
              className="border border-Line rounded-md text-20 mx-auto mt-2.5 p-4 w-full h-14 max-w-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input password"
              required
            />
            <p className="text-base lg:text-xl text-center mt-7 mb-10">
              Don’t have an account?{" "}
              <Link
                id="register"
                to="/register"
                className="text-PrimaryRed font-semibold"
              >
                Signup Now!
              </Link>
            </p>
            <Button
              id="button-submit"
              className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer"
              label="Sign In"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
