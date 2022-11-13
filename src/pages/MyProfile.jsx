import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import Layout from "../components/Layout";
import { CustomInput } from "../components/CustomInput";
import Button from "../components/CustomButton";

import { apiRequest } from "../utils/apiRequest";
import { handleAuth } from "../utils/redux/reducers/reducer";
import useTitle from "../utils/useTitle";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
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
        const { fullname, email, password, images } = res.data;
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
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        swal("Success Change Profile");
        setObjSubmit({});
      })
      .catch((err) => {
        swal("Change Profile Error");
      })
      .finally(() => fetchData());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleDelete = async () => {
    axios
      .delete(`https://project-edu.online/users`)
      .then((res) => {
        const { data } = res.data;
        setDatas(data);
        removeCookie("token");
        alert("Account has been deleted");
        navigate("/");
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {/* <div key={data.id}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="flex justify-center md:justify-end grid-cols-1 mt-24 mb-20 mx-12">
          <div className="flex flex-col items-center">
            <img
              src={image}
              alt={image}
              className="flex justify-center w-full"
            />
            <CustomInput
              id="change-photo"
              type="file"
              className="w-32 text-center flex justify-center items-center text-SecondaryBlue text-xl mt-2.5 cursor-pointer"
              label="Change Photo"
              // value={objSubmit.images}
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                handleChange(e.target.files[0], "images");
              }}
            />

            <h1 className="text-center text-4xl text-PrimaryBlue mt-7">
              {fullName}
            </h1>
            <p className="text-center text-2xl text-PrimaryBlue">{email}</p>
            <Button
              onClick={() => (cookies ? handleDelete() : navigate("/"))}
              id="deactivate"
              className="flex justify-center items-center font-semibold text-PrimaryRed text-xl mt-7 cursor-pointer"
              label="Deactivate"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start w-full h-screen mt-28 px-2">
          <div>
            <div>
              <label className="font-semibold text-2xl text-PrimaryBlue">
                Full Name
              </label>
              <CustomInput
                id="fullname"
                type="text"
                className="border border-Line bg-transparent rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
                value={objSubmit.fullname}
                onChange={(e) => handleChange(e.target.value, "fullname")}
                placeholder="Input New Full Name"
              />
              <br />
              <label className="font-semibold text-2xl text-PrimaryBlue">
                Email
              </label>
              <CustomInput
                id="email"
                type="email"
                className="border border-Line bg-transparent rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
                value={objSubmit.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                placeholder="Input New Email"
              />
              <br />
              <label className="font-semibold text-2xl text-PrimaryBlue">
                Password
              </label>
              <CustomInput
                id="password"
                type="password"
                className="border border-Line bg-transparent rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
                value={objSubmit.password}
                onChange={(e) => handleChange(e.target.value, "password")}
                placeholder="Input New Password"
              />
              <Button
                id="button-submit"
                className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer hover:bg-PrimaryRed hover:text-white"
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
