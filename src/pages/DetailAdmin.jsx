import React from "react";

import { CustomInput } from "../components/CustomInput";
import Button from "../components/CustomButton";
import Layout from "../components/Layout";

function DetailAdmin() {
  return (
    <Layout>
      <div>
        <div className="p-2 lg:px-12 lg:pt-10 lg:pb-16 mx-2 lg:mx-10 my-10 lg:mt-24 border border-SecondaryBlue drop-shadow-md shadow-SecondaryBlue rounded-lg max-w-max min-h-fit">
          <div className="flex justify-between">
            <p className="text-base lg:text-2xl text-SecondaryBlue">
              #00001: Handoko
            </p>
            <p className="text-base lg:text-2xl text-SecondaryBlue">
              01/11/2022
            </p>
          </div>
          <div className="grid grid-flow-row lg:grid-rows-4 lg:grid-flow-col justify-evenly my-10 gap-x-10">
            <div className="flex flex-wrap my-2 lg:my-5">
              <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                Address
              </p>
              <p className="w-40 lg:w-80 text-base lg:text-3xl text-PrimaryBlue font-bold">
                : Jl. Pahlawan No. 32 Surabaya
              </p>
            </div>
            <div className="flex flex-wrap my-2 lg:my-5">
              <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                Service Type
              </p>
              <p className="text-base lg:text-3xl text-PrimaryBlue font-bold">
                : Ganti Oli
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
                className="border border-Line rounded-md p-2 h-10"
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
                className="border border-Line rounded-md p-2 h-10"
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
                Rp 123.000
              </p>
            </div>
            <div className="flex flex-wrap justify-between border border-x-white border-t-white border-b-SecondaryBlue my-2 lg:my-5">
              <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                Add. Price
              </p>
              <p className=" text-base lg:text-3xl text-PrimaryBlue font-bold">
                Rp 27.000
              </p>
            </div>
            <div className="flex flex-wrap justify-between my-2 lg:my-5">
              <p className="w-28 lg:w-56 text-base lg:text-2xl text-PrimaryBlue">
                Total Price
              </p>
              <p className="text-base lg:text-3xl text-PrimaryBlue font-bold">
                Rp 150.000
              </p>
            </div>
            <div className="flex flex-wrap my-2 lg:my-5">
              <p className="text-base lg:text-2xl text-SecondaryBlue italic">
                Note: Addition price for changing the oil and front lamp
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        id="button-submit"
        className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-28 h-8 lg:w-52 lg:h-14 max-w-xs lg:mt-10 mb-10 lg:mb-20 cursor-pointer"
        label="Submit"
        // onClick={handleSubmit}
      />
    </Layout>
  );
}

export default DetailAdmin;
