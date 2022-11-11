import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { WithRouter } from "../utils/Navigation";
import Layout from "../components/Layout";
import Button from "../components/CustomButton";
import { CardListAdmin } from "../components/CardDetail";
import { ModalBookingService } from "../components/Modal";
import Hero from "../assets/Hero.png";
import { TfiReload, TfiMoney, TfiBolt, TfiThumbUp } from "react-icons/tfi";

function HomePage() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://project-edu.online/transaction/me`)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="w-full lg:w-3/4">
            <img src={Hero} />
            <div>
              <a href="#modal-booking">
                <Button
                  id="button-book-service"
                  className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-sm lg:text-2xl text-PrimaryRed mx-auto mt-8 lg:mt-16 mb-5 w-36 h-7 lg:w-52 lg:h-14 max-w-xs cursor-pointer"
                  label="Service Now!"
                />
              </a>
              <ModalBookingService />
            </div>
            <p className="p-4">Current Service(s)</p>
            <div className="flex justify-center">
              {datas.length > 0 ? (
                datas &&
                datas.map((data) => (
                  <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
                    <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
                      <p className="font-bold text-PrimaryBlue">{data.id}</p>
                      <span className="lg:w-1/4 flex flex-col items-center">
                        <p className="text-SecondaryBlue">Invoice</p>
                        <p className="font-bold text-2xl text-PrimaryBlue">
                          {data.invoice}
                        </p>
                      </span>

                      <span className="lg:w-1/4 flex flex-col items-center">
                        <p className="text-SecondaryBlue">Service Date</p>
                        <p className="font-bold text-2xl text-PrimaryBlue">
                          {data.date}
                        </p>
                      </span>

                      <Button
                        id="btn-detail"
                        className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer"
                        label="Detail"
                        onClick={() => navigate(`/detail/${data.id}`)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-screen flex justify-center items-center text-center ">
                  <p className="text-4xl font-extrabold  text-PrimaryBlue">
                    "There's nothing to do in here"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mx-44 lg:mt-20 mb-12">
        <h1 className="font-bold text-lg lg:text-5xl text-left p-2">
          Benefits service with us
        </h1>
        <div className="card grid grid-rows-4 lg:grid-rows-2 grid-flow-col my-6 mx-2 gap-5">
          <div className="flex justify-between gap-5 my-6">
            <div>
              <TfiReload className="bg-SecondaryBlue rounded w-10 h-10 p-1 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-4xl text-PrimaryBlue font-bold mb-2.5">
                More Flexibile
              </h1>
              <p className="text-base lg:text-xl text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 my-6 ">
            <div>
              <TfiMoney className="bg-SecondaryBlue rounded w-10 h-10 p-1 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-4xl text-PrimaryBlue font-bold mb-2.5">
                Many Discounts
              </h1>
              <p className="text-base lg:text-xl text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 my-6">
            <div>
              <TfiBolt className="bg-SecondaryBlue rounded w-10 h-10 p-1 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-4xl text-PrimaryBlue font-bold mb-2.5">
                Fast Service
              </h1>
              <p className="text-base lg:text-xl text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 my-6 ">
            <div>
              <TfiThumbUp className="bg-SecondaryBlue rounded w-10 h-10 p-1 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-4xl text-PrimaryBlue font-bold mb-2.5">
                Good Mechanics
              </h1>
              <p className="text-base lg:text-xl text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WithRouter(HomePage);
