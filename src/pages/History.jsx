import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useTitle from "../utils/useTitle";
import { apiRequest } from "../utils/apiRequest";

import Layout from "../components/Layout";
import { CardHistory } from "../components/CardDetail";

import moment from "moment/moment";

function History() {
  useTitle("My History");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiRequest("history", "get", {})
      .then((res) => {
        const results = res.data;
        setDatas(results);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white">
        <Layout>
          <div className="w-full h-screen flex flex-col items-center mt-16 my-5">
            {datas !== null ? (
              datas &&
              datas.map((data) => (
                <CardHistory
                  key={data.id}
                  id={data.id}
                  invoice={data.invoice}
                  date={moment(datas.date).format("l")}
                  price={data.total}
                />
              ))
            ) : (
              <div className="w-full h-screen flex justify-center items-center text-center ">
                <p className="text-4xl font-extrabold  text-PrimaryBlue">
                  "There's nothing to do in here"
                  <br />
                  <span className="text-PrimaryRed">
                    <Link
                      id="book-service"
                      className="hover:text-PrimaryBlue italic"
                      to="/home"
                    >
                      Lets book a service!
                    </Link>
                  </span>
                </p>
              </div>
            )}
          </div>
        </Layout>
      </div>
    </>
  );
}

export default History;
