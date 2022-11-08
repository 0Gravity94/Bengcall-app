import React from "react";
import Button from "./CustomButton";
import { CustomSelect } from "./CustomInput";
import { default as ReactSelect } from "react-select";
import { FiSettings } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { ModalAdminEdit, ModalComment } from "./Modal";

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

function CardListAdmin() {
  const statusOptions = [
    { value: "on-the-way", label: "On The Way" },
    { value: "service-on-progress", label: "Service On Progress" },
    { value: "service-complete", label: "Service Has Completed" },
  ];

  return (
    <div className="w-full space-x-20 flex justify-center">
      <div className="w-3/4 p-6 border-2 border-SecondaryBlue rounded-lg bg-white shadow-lg">
        <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center gap-2 md:gap-8">
          <p className="font-bold text-PrimaryBlue">1</p>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Service ID</p>
            <p className="font-bold text-2xl text-PrimaryBlue">#00001</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Customer Name</p>
            <p className="font-bold text-2xl text-PrimaryBlue">Handoko</p>
          </span>
          <span className="lg:w-1/4 flex flex-col items-center">
            <p className="text-SecondaryBlue">Service Date</p>
            <p className="font-bold text-2xl text-PrimaryBlue">01/11/2022</p>
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
              // onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardListService({ vehicle, service, onDelete }) {
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
            <div className="w-full h-full flex gap-20 border-b-2">
              <p className="w-1/4 font-bold text-xl text-PrimaryBlue">
                {data.name_vehicle}
              </p>
              {service.map((data) => (
                <>
                  <ul key={data.vehicle_id} className="w-1/4 list-disc">
                    <li
                      key={data.id}
                      className="font-bold text-xl text-PrimaryBlue"
                    >
                      {data.service_name}
                    </li>
                  </ul>
                  <ul key={data.vehicle_id} className="w-1/4">
                    <li
                      key={data.id}
                      className="font-bold text-xl text-PrimaryRed"
                    >
                      {data.price}
                    </li>
                  </ul>
                </>
              ))}

              <span className="w-1/4 h-full flex flex-col items-center justify-center gap-4">
                <a href="#my-modal-3">
                  <FiSettings
                    id="btn-setting"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 cursor-pointer stroke-PrimaryBlue hover:stroke-SecondaryBlue"
                    vehicleList={vehicle}
                    serviceList={service}
                  />
                </a>
                <HiOutlineTrash
                  id="btn-trash"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 cursor-pointer stroke-PrimaryRed hover:stroke-SecondaryRed"
                  onClick={onDelete}
                />
                <ModalAdminEdit />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CardHistory, CardListAdmin, CardListService };
