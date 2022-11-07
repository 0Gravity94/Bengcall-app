import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert";

import Layout from "../components/Layout";
import { CustomInput } from "../components/CustomInput";
import Button from "../components/CustomButton";

import { apiRequest } from "../utils/apiRequest";
import { handleAuth } from "../utils/redux/reducers/reducer";
import useTitle from "../utils/useTitle";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [password, setPassword] = useState("");
  const [objSubmit, setObjSubmit] = useState({});
  const [loading, setLoading] = useState(true);
  useTitle(`My Profile - ${fullName}`);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiRequest("users", "get", {})
      .then((res) => {
        const { fullname, email, images, password } = res.data;
        setFullName(fullname);
        setEmail(email);
        setImage(images);
        setPassword(password);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put("users", objSubmit, {
        headers: {
          header1: { "Content-Type": "multipart/form-data" },
        },
      })
      .then((res) => {
        const { message } = res;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
      })
      .catch((err) => {
        const { data } = err.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleDelete = async () => {
    localStorage.removeItem("token");
    dispatch(handleAuth(true));
    navigate("/");
    alert("Are you sure you want to delete the account? ");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {/* <div key={data.id}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="flex justify-end grid-cols-1 mt-24 mb-20 mx-12">
          <div>
            <img
              src={image}
              alt={image}
              className="flex justify-center w-full"
            />
            <Button
              id="change-photo"
              className="flex justify-center items-center text-SecondaryBlue text-xl mt-2.5 cursor-pointer"
              label="Change Photo"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                handleChange(e.target.files[0], "image");
              }}
            />

            <h1 className="text-center text-4xl text-PrimaryBlue mt-7">
              {fullName}
            </h1>
            <p className="text-center text-2xl text-PrimaryBlue">{email}</p>
            <Button
              onClick={() => handleDelete}
              id="deactivate"
              className="flex justify-center items-center font-semibold text-PrimaryRed text-xl mt-7 cursor-pointer"
              label="deactivate"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start w-full h-screen mt-28 mx-12 px-2">
          <div>
            <div>
              <label className="font-semibold text-2xl text-PrimaryBlue">
                Full Name
              </label>
              <CustomInput
                id="fullname"
                type="text"
                className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
                value={fullName}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Input New Full Name"
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
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Input New Email"
              />
              <br />
              <label className="font-semibold text-2xl text-PrimaryBlue">
                Password
              </label>
              <CustomInput
                id="password"
                type="password"
                className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
                value={password}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Input New Password"
              />
              <Button
                id="button-submit"
                className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer"
                label="Submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
}

export default MyProfile;
