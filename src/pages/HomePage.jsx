import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { WithRouter } from "../utils/Navigation";
import Layout from "../components/Layout";
import Button from "../components/CustomButton";
import { CardListCostumer } from "../components/CardDetail";
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
      <div className="hero min-h-screen bg-white">
        <div className="hero-content text-center">
          <div className="w-full lg:w-3/4">
            <img src={Hero} />
            <div>
              <a href="#modal-booking">
                <Button
                  id="button-book-service"
                  className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-sm lg:text-2xl text-PrimaryRed mx-auto mt-8 lg:mt-16 mb-5 w-36 h-7 lg:w-52 lg:h-14 max-w-xs hover:bg-PrimaryRed hover:text-white cursor-pointer"
                  label="Service Now!"
                />
              </a>
              <ModalBookingService />
            </div>
            {datas.length === 1 ? (
              <p className="p-4">Current Service(s)</p>
            ) : (
              <p> </p>
            )}
            <div className="flex justify-center">
              {datas.length === 1 ? (
                datas &&
                datas.map((data) => (
                  <CardListCostumer
                    id={data.id}
                    invoice={data.invoice}
                    date={data.date}
                    onClick={() => navigate(`/detail/${data.id}`)}
                  />
                ))
              ) : (
                <div className="w-full h-screen flex justify-center items-center text-center ">
                  <p className="text-4xl font-extrabold  text-PrimaryBlue">
                    "You have no reservation"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 flex flex-col mx-auto lg:mt-20  bg-white">
        <h1 className="font-extrabold text-lg lg:text-4xl text-PrimaryBlue text-left p-2">
          Why Choose Our Service?
        </h1>
        <div className="card grid grid-rows-4 lg:grid-rows-2 grid-flow-col my-6 mx-2 gap-5">
          <div className="flex justify-between gap-5 my-6">
            <div>
              <TfiReload className="bg-SecondaryBlue rounded w-10 h-10 p-1 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-3xl text-PrimaryBlue font-bold mb-2.5">
                Flexible
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
              <h1 className="text-lg lg:text-3xl text-PrimaryBlue font-bold mb-2.5">
                Discounts Price
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
              <h1 className="text-lg lg:text-3xl text-PrimaryBlue font-bold mb-2.5">
                Fast
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
              <h1 className="text-lg lg:text-3xl text-PrimaryBlue font-bold mb-2.5">
                Well Trained Mechanic
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
