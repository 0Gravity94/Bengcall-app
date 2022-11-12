import React from "react";
import Button from "./CustomButton";
import { CustomSelect } from "./CustomInput";
import { default as ReactSelect } from "react-select";
import { FiSettings } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { ModalAdminEdit, ModalComment } from "./Modal";

import { Link } from "react-router-dom";

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
  status,
  onNavigate,
}) {
  const statusOptions = [
    { value: "1", label: "On The Way" },
    { value: "2", label: "Service On Progress" },
    { value: "3", label: "Service Has Completed" },
  ];

  return (
    <div className="w-full space-x-20 flex justify-center mb-10">
      <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
        <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
          <p className="font-bold text-PrimaryBlue">{number}</p>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Service ID</p>
            <p className="font-bold text-2xl text-PrimaryBlue">{invoice}</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Customer Name</p>
            <p className="font-bold text-2xl text-PrimaryBlue">{fullname}</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Service Date</p>
            <p className="font-bold text-2xl text-PrimaryBlue">{date}</p>
          </span>
          <div className="lg:w-2/4 flex flex-col lg:flex-row lg:items-center gap-6">
            <ReactSelect
              id="vehicle-type"
              className="lg:w-full"
              options={statusOptions}
              components={{
                CustomSelect,
              }}
            />

            <Button
              id="btn-detail"
              className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer"
              label="Detail"
              onClick={onNavigate}
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

function CardListService({ vehicle, service, onDelete, onNavigate }) {
  return (
    <div className="w-full space-x-20 flex justify-center">
      <div className="w-5/6 h-auto flex flex-col p-6 gap-2 box-border">
        <div className="w-full flex gap-20">
          <p className="w-1/4 font bold text-xl text-SecondaryBlue">
            Vehicle type
          </p>
          <span className="w-1/4"></span>
        </div>
        {vehicle.map((data) => (
          <div key={data.id}>
            <div className="w-full h-full flex justify-between gap-20 border-b-2">
              <p className="w-1/4 font-bold text-xl text-PrimaryBlue">
                {data.name_vehicle}
              </p>
              <span className="w-1/4 h-full flex flex-col items-end justify-center gap-4">
                <a
                  id="btn-setting"
                  onClick={() => onNavigate(data.id)}
                  // href="#my-modal-3"
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
                {/* <ModalAdminEdit /> */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CardHistory, CardListAdmin, CardListCostumer, CardListService };
