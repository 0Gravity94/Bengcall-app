import React, { useState, useEffect } from "react";

import useTitle from "../utils/useTitle";
import { apiRequest } from "../utils/apiRequest";
import Layout from "../components/Layout";
import { CardHistory } from "../components/CardDetail";

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
          <div className="w-full h-full flex flex-col items-center">
            {datas !== null ? (
              datas &&
              datas.map((data) => (
                <CardHistory
                  key={data.id}
                  invoice={data.invoice}
                  date={data.date}
                  price={data.total}
                />
              ))
            ) : (
              <div className="w-full h-screen flex justify-center items-center text-center ">
                <p className="text-4xl font-extrabold  text-PrimaryBlue">
                  "There's nothing to do in here
                  <br />
                  <span className="text-PrimaryRed">Lets book a service!</span>"
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
