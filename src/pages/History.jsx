import React, { useState } from "react";

import useTitle from "../utils/useTitle";

import Layout from "../components/Layout";
import { CardHistory } from "../components/CardDetail";

function History() {
  useTitle("My History");

  const [empty, setEmpty] = useState(true);

  return (
    <>
      <div className="bg-white">
        <Layout>
          <div className="w-full h-full flex flex-col items-center">
            {empty ? (
              <div className="w-full h-screen flex justify-center items-center text-center ">
                <p className="text-4xl font-extrabold  text-PrimaryBlue">
                  "There's nothing to do in here
                  <br />
                  <span className="text-PrimaryRed">Lets book a service!</span>"
                </p>
              </div>
            ) : (
              <CardHistory />
            )}
          </div>
        </Layout>
      </div>
    </>
  );
}

export default History;
