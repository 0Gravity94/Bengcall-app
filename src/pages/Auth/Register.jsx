import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { CustomInput } from "../../components/CustomInput";
import Button from "../../components/CustomButton";
import LogReg from "../../assets/LogReg.png";
import useTitle from "../../utils/useTitle";
import { apiRequest } from "../../utils/apiRequest";
import swal from "sweetalert";

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  useTitle("Register");

  useEffect(() => {
    if (fullname && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullname, email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      fullname: fullname,
      email: email,
      password: password,
    };
    apiRequest("register", "post", body)
      .then((res) => {
        const { message, data } = res;
        if (data) {
          navigate("/");
        }
        alert(message);
      })
      .catch((err) => {
        const { message } = err.response;
        if (fullname === "") {
          swal("Field(s) should not be empty");
        } else if (fullname.length < 3) {
          swal("Full Name should atleast be 3 letters");
        } else if (email === "") {
          swal("Field(s) should not be empty");
        } else if (password === "") {
          swal("Field(s) should not be empty");
        } else if (password.length < 8) {
          swal("Password should be atleast 8 characters");
        } else if (password !== passwordRegex) {
          swal(
            "Password should contain atleast 8 characters & containing letters and atleast 1 number"
          );
        } else {
          swal(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="hidden md:flex lg:flex w-full h-full">
        <img src={LogReg} alt="Bengcall" className="w-full" />
      </div>
      <div className="flex flex-wrap justify-center bg-white w-full h-screen mt-28 px-2">
        <div>
          <h1 className="font-bold text-5xl text-center text-PrimaryBlue my-14">
            Sign Up
          </h1>
          <div>
            <label className="font-semibold text-2xl text-PrimaryBlue">
              Full Name
            </label>
            <CustomInput
              id="fullname"
              type="text"
              className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Input Full Name"
            />
            <br />
            <label className="font-semibold text-2xl text-PrimaryBlue">
              Email
            </label>
            <CustomInput
              id="email"
              type="email"
              className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input email"
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
            />
            <p className="text-base lg:text-xl text-center mt-7 mb-10">
              Already have an account?{" "}
              <Link id="login" to="/" className="text-PrimaryRed font-semibold">
                Sign in here.
              </Link>
            </p>
            <Button
              id="button-submit"
              className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer"
              label="Sign Up"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
