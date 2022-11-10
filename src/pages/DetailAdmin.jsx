import React, { useState, useEffect } from "react";

import { CustomInput } from "../components/CustomInput";
import Button from "../components/CustomButton";
import Layout from "../components/Layout";

import { apiRequest } from "../utils/apiRequest";
import useTitle from "../utils/useTitle";
import { WithRouter } from "../utils/Navigation";
import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";

function DetailAdmin(props) {
  useTitle("Order Detail");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const { id } = props.params;
    apiRequest(`transaction/${id}`, "get", {})
      .then((res) => {
        const results = res.data;
        setData(results);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for (const key in objSubmit) {
  //     formData.append(key, objSubmit[key]);
  //   }
  //   axios
  //     .put(`admin/transaction/${id}`, objSubmit, {
  //       headers: {
  //         header1: { "Content-Type": "multipart/form-data" },
  //       },
  //     })
  //     .then((res) => {
  //       const { message } = res;
  //       MySwal.fire({
  //         title: "Success",
  //         text: message,
  //         showCancelButton: false,
  //       });
  //       setObjSubmit({});
  //     })
  //     .catch((err) => {
  //       const { data } = err.response;
  //       MySwal.fire({
  //         title: "Failed",
  //         text: data.message,
  //         showCancelButton: false,
  //       });
  //     })
  //     .finally(() => fetchData());
  // };

  // const handleChange = (value, key) => {
  //   let temp = { ...objSubmit };
  //   temp[key] = value;
  //   setObjSubmit(temp);
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div key={data.id} className="h-full w-full bg-white">
        <NavbarAdmin />
        <div className="w-full flex flex-col items-center gap-6 justify-center">
          <div className="p-2 lg:px-12 lg:pt-10 lg:pb-16 mx-2 lg:mx-10 my-10 lg:mt-24 border border-SecondaryBlue drop-shadow-md shadow-SecondaryBlue rounded-lg max-w-max min-h-fit">
            <div className="flex justify-between">
              <p className="text-base lg:text-2xl text-SecondaryBlue">
                {data.id}: {data.fullname}
              </p>
              <p className="text-base lg:text-2xl text-SecondaryBlue">
                {data.date}
              </p>
            </div>
            <div className="grid grid-flow-row lg:grid-rows-4 lg:grid-flow-col justify-evenly my-10 gap-x-10">
              <div className="flex flex-wrap my-2 lg:my-5">
                <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Address
                </p>
                <p className="w-40 lg:w-80 text-base lg:text-3xl text-PrimaryBlue font-bold">
                  : {data.address}
                </p>
              </div>
              <div className="flex flex-wrap my-2 lg:my-5">
                <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Service Type
                </p>
                <p className="text-base lg:text-3xl text-PrimaryBlue font-bold">
                  : {data.service}
                </p>
              </div>
              <div className="flex flex-wrap my-2 lg:my-5">
                <p className="w-40 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Add. Service Type
                </p>
                <p className="text-base lg:text-3xl text-PrimaryBlue font-bold mr-2">
                  :
                </p>
                <CustomInput
                  id="service-type"
                  type="text"
                  className="border border-Line bg-transparent rounded-md p-2 h-10"
                  placeholder="Input text"
                  //value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap my-2 lg:my-5">
                <p className="w-40 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Add. Price
                </p>
                <p className="text-base lg:text-3xl text-PrimaryBlue font-bold mr-2">
                  :
                </p>
                <CustomInput
                  id="service-type"
                  type="text"
                  className="border border-Line bg-transparent rounded-md p-2 h-10"
                  placeholder="Input price"
                  //value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap justify-between my-2 lg:my-5">
                <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Estimate Price
                </p>
                <p className="text-base lg:text-3xl text-PrimaryBlue font-bold">
                  {/* Rp 123.000 */}
                </p>
              </div>
              <div className="flex flex-wrap justify-between border border-x-white border-t-white border-b-SecondaryBlue my-2 lg:my-5">
                <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Add. Price
                </p>
                <p className=" text-base lg:text-3xl text-PrimaryBlue font-bold">
                  {/* Rp 27.000 */}
                </p>
              </div>
              <div className="flex flex-wrap justify-between my-2 lg:my-5">
                <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                  Total Price
                </p>
                <p className="text-base lg:text-3xl text-PrimaryBlue font-bold">
                  {data.total}
                </p>
              </div>
              <div className="flex flex-wrap my-2 lg:my-5">
                <p className="text-base lg:text-2xl text-SecondaryBlue italic">
                  {/* Note: Addition price for changing the oil and front lamp */}
                </p>
              </div>
            </div>
          </div>
          <Button
            id="button-submit"
            className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-28 h-8 lg:w-52 lg:h-14 max-w-xs cursor-pointer"
            label="Submit"
            // onClick={handleSubmit}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default WithRouter(DetailAdmin);
