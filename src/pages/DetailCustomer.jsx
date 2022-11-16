import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { WithRouter } from "../utils/Navigation";
import Layout from "../components/Layout";
import { CustomInput } from "../components/CustomInput";
import { ModalBookingService } from "../components/Modal";
import Button from "../components/CustomButton";
import {
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import "../styles/index.css";
import moment from "moment/moment";

function DetailCustomer(props) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(
        `https://project-edu.online/transaction/${props.params.id}
      `
      )
      .then((res) => {
        const { data } = res.data;
        const temp = [...datas];
        temp.push(data);
        setDatas(temp);
        console.log(datas);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="w-full h-screen bg-white">
        <Layout>
          <div className="w-full h-full bg-white">
            {datas !== null ? (
              datas.map((data) => (
                <>
                  <div>
                    <div class="relative flex mx-2 mt-10 lg:mt-24 lg:mx-64 items-center justify-center">
                      {data.status === 2 ? (
                        <span class="flex-shrink">
                          <HiOutlineTruck className="bg-PrimaryBlue rounded-full text-6xl lg:text-8xl text-white p-2 lg:p-4" />
                        </span>
                      ) : (
                        <span class="flex-shrink">
                          <HiOutlineTruck className="bg-Line rounded-full text-6xl lg:text-8xl text-white p-2 lg:p-4" />
                        </span>
                      )}
                      <div class="flex-grow border-t-8 border-Line"></div>
                      {data.status === 3 ? (
                        <span class="flex-shrink bg-SecondaryBlue rounded-full text-6xl lg:text-8xl text-white">
                          <HiOutlineClock className="p-2 lg:p-4" />
                        </span>
                      ) : (
                        <span class="flex-shrink bg-Line rounded-full text-6xl lg:text-8xl text-white">
                          <HiOutlineClock className="p-2 lg:p-4" />
                        </span>
                      )}

                      <div class="flex-grow border-t-8 border-Line"></div>
                      {data.status === 4 ? (
                        <span class="flex-shrink  bg-PrimaryRed rounded-full text-6xl lg:text-8xl text-white">
                          <HiOutlineCheckCircle className="p-2 lg:p-4" />
                        </span>
                      ) : (
                        <span class="flex-shrink  bg-Line rounded-full text-6xl lg:text-8xl text-white">
                          <HiOutlineCheckCircle className="p-2 lg:p-4" />
                        </span>
                      )}
                    </div>
                    <div class="relative flex lg:mx-56 py-5 items-center justify-center">
                      <span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">
                        Mechanic on the way
                      </span>
                      <div class="flex-grow border-t-8 border-white"></div>
                      <span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">
                        Service in progress
                      </span>
                      <div class="flex-grow border-t-8 border-white"></div>
                      <span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">
                        Service is done
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mx-2 lg:mx-44 my-5 lg:mt-12 border border-SecondaryBlue drop-shadow-md shadow-SecondaryBlue rounded-lg min-w-max">
                      {data.status === 1 ? (
                        <h1 className="font-semibold text-SecondaryBlue text-xs lg:text-4xl text-center mt-5 lg:mt-16 ">
                          Your Booking is on {moment(data.date).format("l")}
                        </h1>
                      ) : (
                        ""
                      )}
                      {data.status === 5 ? (
                        <h1 className="font-semibold text-SecondaryBlue text-xs lg:text-4xl text-center mt-5 lg:mt-16 ">
                          Waiting for payment
                        </h1>
                      ) : (
                        ""
                      )}
                      <div className="flex grid-rows-1 grid-flow-col justify-evenly my-2 lg:mt-12">
                        <div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2 lg:mb-12">
                          <p>Service Type:</p>
                          <h1 className="font-bold">
                            {data.other == null
                              ? data.detail[0].service_name
                              : ` ${data.detail[0].service_name} , ${data.other}`}
                          </h1>
                        </div>
                        <div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2 lg:mb-12">
                          <p>Vehicle Type:</p>
                          <h1 className="font-bold ">
                            {" "}
                            {data.detail[0].vehicle_name}
                          </h1>
                        </div>
                      </div>
                      <div className="flex grid-rows-1 grid-flow-col justify-evenly my-2 lg:mt-12 lg:mb-12">
                        <div className="flex flex-wrap place-items-center text-left text-xs lg:text-4xl text-PrimaryBlue gap-2 mr-8 lg:mr-24">
                          <p>Invoice:</p>
                          <h1 className="font-bold"> {data.invoice}</h1>
                        </div>
                        <div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2 mr-3 lg:mr-10">
                          <p>Total Price:</p>
                          <h1 className="font-bold ">{data.total}</h1>
                        </div>
                      </div>
                      <p className="text-base lg:text-2xl text-PrimaryBlue text-center mb:1 lg:mb-5">
                        Payment Method:
                      </p>
                      <div className="flex flex-wrap justify-center items-center text-PrimaryBlue text-base lg:text-3xl font-bold mb-2 lg:mb-10">
                        <Button
                          id="pay-button"
                          className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto w-28 h-8 lg:w-52 lg:h-14 max-w-xs mt-4 lg:mt-10 mb-4 lg:mb-20 cursor-pointer"
                          label="Transfer"
                          onClick={() =>
                            window.open(`${data.payment_link}`, "_blank")
                          }
                        />
                        <Button
                          id="pay-button"
                          className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto w-28 h-8 lg:w-52 lg:h-14 max-w-xs mt-4 lg:mt-10 mb-4 lg:mb-20 cursor-pointer"
                          label="Cash"
                          onClick={() => navigate("/home")}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="grid grid-rows-2 grid-flow-col justify-center place-items-center mt-56 mb-80">
                <h1 className="font-bold text-base lg:text-5xl text-PrimaryBlue">
                  "You don't have any ongoing service"
                </h1>
                <div>
                  <a href="#modal-booking">
                    <Button
                      id="button-book-service"
                      className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-base lg:text-2xl text-PrimaryRed m-auto w-32 h-8 lg:w-52 lg:h-14 max-w-xs mt-4 lg:mt-24 cursor-pointer"
                      label="Service Now!"
                    />
                  </a>
                  <ModalBookingService />
                </div>
              </div>
            )}{" "}
          </div>
        </Layout>
      </div>
    </>
  );
}

export default WithRouter(DetailCustomer);
