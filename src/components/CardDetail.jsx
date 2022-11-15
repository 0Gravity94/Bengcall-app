import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "./CustomButton";
import { CustomSelect } from "./CustomInput";
import { default as ReactSelect } from "react-select";
import { FiSettings } from "react-icons/fi";
import { HiOutlineTrash, HiCheckCircle } from "react-icons/hi2";
import { ModalAdminEdit, ModalComment } from "./Modal";

import { apiRequest } from "../utils/apiRequest";

import { Link } from "react-router-dom";
import swal from "sweetalert";

function CardHistory({ invoice, date, price }) {
  return (
    <>
      <div className="w-full space-x-20 flex justify-center">
        <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
          <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
            <p className="font-bold text-PrimaryBlue">1</p>
            <span className="md:w-1/4 flex flex-col items-center">
              <p className="text-SecondaryBlue">Service ID</p>
              <p className="font-bold text-2xl text-PrimaryBlue">{invoice}</p>
            </span>
            <span className="md:w-1/4 flex flex-col items-center">
              <p className="text-SecondaryBlue">Service Date</p>
              <p className="font-bold text-2xl text-PrimaryBlue">{date}</p>
            </span>
            <span className="md:w-1/4 flex flex-col items-center">
              <p className="text-SecondaryBlue">Total Price</p>
              <p className="font-bold text-2xl text-PrimaryBlue">{price}</p>
            </span>
            <div className="lg:w-1/4 flex flex-col lg:flex-row gap-6">
              <Button
                id="btn-detail"
                className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer"
                label="Detail"
                // onClick={handleSubmit}
              />
              <a href="#my-modal-2">
                <Button
                  id="btn-review"
                  className="border-2 border-SecondaryBlue rounded-lg font-semibold text-lg bg-SecondaryBlue text-white px-5 py-1  hover:bg-white hover:text-SecondaryBlue cursor-pointer"
                  label="Review"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <ModalComment invoice={invoice} />
    </>
  );
}

function CardListAdmin({
  number,
  invoice,
  fullname,
  date,
  price,
  statuses,
  onNavigate,
  onDelete,
}) {
  const [objSubmit, setObjSubmit] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest(
      `admin/transaction/${number}`,
      "put",
      objSubmit,
      "multipart/form-data"
    )
      .then((res) => {
        swal("Status change");
        setObjSubmit({});
      })
      .catch((err) => {
        swal("Failed");
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
    console.log(temp);
  };

  return (
    <div className="w-full space-x-20 flex justify-center mb-10">
      <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
        <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
          <p className="font-bold text-PrimaryBlue">{number}</p>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Invoice</p>
            <p className="font-bold text-xl text-PrimaryBlue">{invoice}</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Customer Name</p>
            <p className="font-bold text-xl text-PrimaryBlue">{fullname}</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Service Date</p>
            <p className="font-bold text-xl text-PrimaryBlue">{date}</p>
          </span>
          <div className="lg:w-2/4 flex flex-col items-center lg:flex-row lg:items-center gap-6">
            <select
              placeholder="Select status"
              className="w-full h-10 border border-Line rounded-md"
              onChange={(e) =>
                handleChange(e.target.value.replace(/\D/g, ""), "status")
              }
            >
              <option id="option-status" value={1}>
                Order Confirmed
              </option>
              <option id="option-status" value={2}>
                Mechanic on the way
              </option>
              <option id="option-status" value={3}>
                Service in progress
              </option>
              <option id="option-status" value={4}>
                Service done
              </option>
              <option id="option-status" value={5}>
                Waiting for payment confirmation
              </option>

              <option id="option-status" value={6}>
                Payment done
              </option>
            </select>

            <HiCheckCircle
              id="btn-changeStatus"
              viewBox="0 0 24 24"
              className="w-12 h-12 cursor-pointer stroke-green-600 hover:stroke-green-900"
              onClick={() => handleSubmit()}
            />

            <Button
              id="btn-detail"
              className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer"
              label="Detail"
              onClick={onNavigate}
            />
            <HiOutlineTrash
              id="btn-trash"
              viewBox="0 0 24 24"
              className="w-12 h-12 cursor-pointer stroke-PrimaryRed hover:stroke-SecondaryRed"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardListCostumer({ id, invoice, date, onClick }) {
  return (
    <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
        <p className="font-bold text-PrimaryBlue">{id}</p>
        <span className="lg:w-1/4 flex flex-col items-center">
          <p className="text-SecondaryBlue">Invoice</p>
          <p className="font-bold text-2xl text-PrimaryBlue">{invoice}</p>
        </span>

        <span className="lg:w-1/4 flex flex-col items-center">
          <p className="text-SecondaryBlue">Service Date</p>
          <p className="font-bold text-2xl text-PrimaryBlue">{date}</p>
        </span>

        <Button
          id="btn-detail"
          className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer"
          label="Detail"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

function CardListService({
  vehicle,
  service,
  onDelete,
  addService,
  serviceChange,
  priceChange,
  serviceVal,
  priceVal,
}) {
  // const [datas, setDatas] = useState([]);

  // const fetchData = () => {
  //   apiRequest("admin/vehicleservice", "get", {})
  //     .then((res) => {
  //       const results = res.data;
  //       setDatas(results);
  //     })
  //     .catch((err) => {
  //       const { data } = err.response;
  //       alert(data.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="w-full space-x-20 flex justify-center">
      <div className="w-5/6 h-auto flex flex-col p-6 gap-2 box-border">
        <div className="w-full flex gap-20">
          <p className="w-1/4 font bold text-xl text-SecondaryBlue">
            Vehicle type
          </p>
          <p className="w-1/4 font bold text-xl text-SecondaryBlue">
            Service type
          </p>
          <p className="w-1/4 font bold text-xl text-SecondaryBlue">Price</p>
          <span className="w-1/4"></span>
        </div>
        {vehicle.map((data) => (
          <div key={data.id}>
            <div className="w-full h-full flex justify-between gap-20 border-b-2">
              <p className="w-1/4 font-bold text-xl text-PrimaryBlue">
                {data.name_vehicle}
              </p>
              <ul className="w-1/4 font-bold text-xl text-PrimaryBlue">
                {service !== null ? (
                  service &&
                  service.map((item) => (
                    <li key={item.id}>{item.service_name}</li>
                  ))
                ) : (
                  <li>Tidak ada layanan</li>
                )}
              </ul>
              <ul className="w-1/4 font-bold text-xl text-PrimaryRed">
                {service !== null ? (
                  service &&
                  service.map((item) => <li key={item.id}>{item.price}</li>)
                ) : (
                  <li>Tidak ada layanan</li>
                )}
              </ul>
              <span className="w-1/4 h-full flex flex-col items-end justify-center gap-4">
                <a
                  id="btn-setting"
                  // onClick={() => onNavigate(data.id)}
                  href="#my-modal-3"
                >
                  <FiSettings
                    viewBox="0 0 24 24"
                    className="w-7 h-7 cursor-pointer stroke-PrimaryBlue hover:stroke-SecondaryBlue"
                  />
                </a>
                <HiOutlineTrash
                  id="btn-trash"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 cursor-pointer stroke-PrimaryRed hover:stroke-SecondaryRed"
                  onClick={() => onDelete(data.id)}
                />
                <ModalAdminEdit
                  handleAdd={addService}
                  serviceInput={serviceChange}
                  priceInput={priceChange}
                  service={serviceVal}
                  price={priceVal}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CardHistory, CardListAdmin, CardListCostumer, CardListService };
