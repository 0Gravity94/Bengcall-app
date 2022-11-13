import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { default as ReactSelect } from "react-select";
import { TiDelete } from "react-icons/ti";

import Swal from "sweetalert";

import { CustomInput, CustomOption, CustomSelect } from "./CustomInput";
import Button from "./CustomButton";
import { apiRequest } from "../utils/apiRequest";
import { handleService } from "../utils/redux/reducers/reducer";
import swal from "sweetalert";
import { parse } from "postcss";
import { json } from "react-router-dom";

function ModalBookingService() {
  const dispatch = useDispatch();
  const [idServices, setIdServices] = useState("");
  const [fullName, setFullName] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState([]);
  const [vehicle_id, setVehicle_id] = useState("");
  const [service_id, setService_id] = useState("");
  const [sub_total, setSub_total] = useState("");
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(true);

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  let lastDayOfMonth = new Date();
  lastDayOfMonth.setDate(today.getDate() + 30);

  useEffect(() => {
    fetchVehicles();
    fetchService();
    fetchData();
  }, []);

  function handleChange(e) {
    const findService = services.find((service) => service.id == e);
    const objValues = Object.values(findService);
    setService_id(objValues[0]);
    setSub_total(objValues[2]);
  }

  const handleBookService = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      phone: phone,
      date: new Date(date),
      address: address,
      location: parseInt(location),
      other: other,
      detail: [
        {
          vehicle_id: parseInt(vehicle_id),
          service_id: parseInt(service_id),
          sub_total: parseInt(sub_total),
        },
      ],
    };
    apiRequest("transaction", "post", body, "application/json")
      .then((res) => {
        console.log(res.data);
        swal("Service Booked");
      })
      .catch((err) => {
        const { data } = err.response;
        swal("failed to book");
      })
      .finally(() => setLoading(false));
  };

  const fetchData = () => {
    apiRequest("users", "get", {})
      .then((res) => {
        const { fullname } = res.data;
        setFullName(fullname);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function fetchVehicles() {
    axios
      .get(`https://project-edu.online/vehicle`)
      .then((res) => {
        const { data } = res.data;
        const temp = [...vehicles];
        temp.push(...data);
        setVehicles(temp);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function fetchService() {
    axios
      .get(`https://project-edu.online/service/1`)
      .then((res) => {
        const { data } = res.data;
        const temp = [...services];
        temp.push(...data);
        setServices(temp);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  return (
    <div>
      <div className="modal w-full" id="modal-booking">
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="w-fit h-full lg:w-2/4 lg:h-3/4 p-8 rounded-lg flex flex-col items-center justify-center gap-6 bg-white shadow-md  overflow-auto m-5 lg:m-0">
          <h3 className="font-extrabold text-2xl text-PrimaryBlue">
            Booking Service
          </h3>
          <div className="w-full flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 flex flex-col gap-1">
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Fullname</p>
                <p className="text-xl font-bold text-PrimaryBlue">{fullName}</p>
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Phone</p>
                <CustomInput
                  id="input-phone"
                  type={"tel"}
                  className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                  minLength="10"
                  maxLength="14"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Input phonenumber"
                />
                <p className="text-xs italic">Minimum 10 characters with "0"</p>
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Address</p>
                <CustomInput
                  id="input-address"
                  type={"text"}
                  maxLength="255"
                  className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Input address"
                />
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Booking Date</p>
                <CustomInput
                  id="input-date"
                  type={"datetime-local"}
                  min={tomorrow.toISOString().slice(0, -8)}
                  max={lastDayOfMonth.toISOString().slice(0, -8)}
                  className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Input date"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-1">
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Service Location</p>
                <select
                  placeholder="Select Location"
                  className="w-full h-10 border border-Line rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option id="option-location">Select Location</option>
                  <option id="option-location" value={1}>
                    Home Service
                  </option>
                  <option id="option-location" value={2}>
                    Workshop Service
                  </option>
                </select>
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Vehicle Type</p>
                <select
                  id="select-vehicle"
                  placeholder="Select Vehicle"
                  className="w-full h-10 border border-Line rounded-md"
                  value={detail[vehicle_id]}
                  onChange={(e) => {
                    setVehicle_id(e.target.value);
                  }}
                >
                  <option id="option-vehicle">Select vehicle</option>
                  {vehicles.map((detail) => (
                    <>
                      <option id="option-vehicle" value={detail.id}>
                        {detail.name_vehicle}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Service Type</p>
                <span
                  class="d-inline-block"
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <select
                    placeholder="Select Vehicle"
                    className="w-full h-10 border border-Line rounded-md"
                    value={detail[service_id]}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option id="option-service">Select service</option>
                    {services.map((srv) => (
                      <>
                        <option id="option-service" value={srv.id}>
                          {srv.service_name}
                          {"-"}
                          {srv.price}
                        </option>
                      </>
                    ))}
                  </select>
                </span>
              </div>
              <div className="p-1 h-20">
                <p className="text-PrimaryBlue">Other Request</p>
                <CustomInput
                  id="input-request"
                  type={"text"}
                  className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                  placeholder="Other request(s)"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              id="button-submit"
              className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto px-5 py-1 max-w-xs hover:bg-PrimaryRed hover:text-white cursor-pointer"
              label="SUBMIT"
              onClick={handleBookService}
            />
            <a href="#">
              <Button
                id="button-cancel"
                className="flex justify-center items-center border border-PrimaryBlue rounded-lg font-semibold text-lg text-PrimaryBlue m-auto px-5 py-1 max-w-xs hover:bg-PrimaryBlue hover:text-white cursor-pointer"
                label="CANCEL"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalComment({ invoice }) {
  const [datas, setDatas] = useState([]);
  const [objSubmit, setObjSubmit] = useState({});
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

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleAddComment = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put(`comment/${datas.id}`, objSubmit, {
        headers: {
          header1: { "Content-Type": "multipart/form-data" },
        },
      })
      .then((res) => {
        const { message } = res;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
      })
      .catch((err) => {
        const { data } = err.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  return (
    <div>
      <div className="modal w-full" id="my-modal-2">
        <div className="w-2/4 h-3/4 md:h-auto p-8 rounded-lg flex flex-col items-center justify-center gap-6 bg-white shadow-md  overflow-auto">
          <h3 className="font-extrabold text-2xl text-PrimaryBlue">Comments</h3>
          <div className="w-full space-y-2">
            <p className="text-PrimaryBlue font-bold">Invoice</p>
            <p>{invoice}</p>
          </div>
          <div className="w-full space-y-2">
            <p className="text-PrimaryBlue font-bold">Leave Comments</p>
            <textarea
              name=""
              id="input-comments"
              className="w-full h-60 bg-transparent border-2 rounded-lg p-3 text-PrimaryBlue"
              onChange={(e) => handleChange(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-4">
            <Button
              id="btn-submit"
              className="flex justify-center items-center border-2 border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto px-5 py-1 max-w-xs hover:bg-PrimaryRed hover:text-white cursor-pointer"
              label="SUBMIT"
              onClick={handleAddComment}
            />
            <a href="#">
              <Button
                id="btn-cancel"
                className="flex justify-center items-center border-2 border-PrimaryBlue rounded-lg font-semibold text-lg text-PrimaryBlue m-auto px-5 py-1 max-w-xs hover:bg-PrimaryBlue hover:text-white cursor-pointer"
                label="CANCEL"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAdminAdd({ onChange, addVehicle, value }) {
  return (
    <div>
      <div className="modal w-full" id="my-modal-2">
        <div className="w-10/11 md:w-1/3 h-3/4 md:h-auto p-8 rounded-lg flex flex-col items-center justify-center gap-6 bg-white shadow-md  overflow-auto">
          <h3 className="font-extrabold text-2xl text-PrimaryBlue">
            Add Vehicle
          </h3>
          <div className="w-10/11 md:w-3/4 p-1 h-20 space-y-2">
            <p className="text-PrimaryBlue font-bold">Vehicle Type</p>
            <CustomInput
              id="input-vehicle-type"
              maxLength={20}
              type={"text"}
              className="border border-Line rounded-md text-20 text-PrimaryBlue mx-auto p-1.5 w-full bg-transparent"
              onChange={onChange}
              value={value}
              placeholder="Input vehicle type"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <Button
              id="button-submit"
              className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto px-5 py-1 max-w-xs hover:bg-PrimaryRed hover:text-white cursor-pointer"
              label="SUBMIT"
              onClick={addVehicle}
            />
            <a href="#">
              <Button
                id="button-submit"
                className="border-2 border-PrimaryBlue rounded-lg font-semibold text-lg text-PrimaryBlue m-auto px-5 py-1 max-w-xs hover:bg-PrimaryBlue hover:text-white cursor-pointer"
                label="CANCEL"
                // onClick={handleSubmit}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAdminEdit({ onClick, service, price }) {
  // const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");

  useEffect(() => {
    // fetchVehicle();
    fetchService();
  }, []);

  // const fetchVehicle = () => {
  //   apiRequest("vehicle", "get", {})
  //     .then((res) => {
  //       const results = res.data;
  //       setVehicles(results);
  //     })
  //     .catch((err) => {
  //       const { data } = err.response;
  //       alert(data.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const fetchService = () => {
    apiRequest("admin/vehicleservice", "get", {})
      .then((res) => {
        const results = res.data;
        setServices(results);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddService = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest("admin/service", "post", objSubmit, "multipart/form-data")
      .then((res) => {
        alert("New Service Added");
        setObjSubmit({});
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        fetchService();
        setLoading(false);
      });
  };

  // const handleDelete = async (id) => {
  //   apiRequest(`admin/service/${id}`, "delete")
  //     .then((res) => {
  //       alert(res.message);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     })
  //     .finally(() => {
  //       fetchService();
  //       setLoading(false);
  //     });
  // };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  return (
    <div>
      <div className="modal w-full" id="my-modal-3">
        <div className="w-10/11 md:w-2/4 h-auto md:h-3/4 p-8 rounded-lg flex flex-col items-center gap-6 bg-white shadow-md  overflow-auto">
          <h3 className="font-extrabold text-2xl text-PrimaryBlue">
            Edit Service
          </h3>
          <div className="w-full flex flex-col items-center md:flex-row gap-4">
            {/* <div className="w-full md:w-1/3">
              <p>Vehicle Type</p>

              <ReactSelect
                key={datas.id}
                id="vehicle-type"
                options={datas.name_vehicle}
                components={{
                  CustomSelect,
                }}
              />
            </div> */}
            <div className="w-full md:w-1/2">
              <p>Service Type</p>
              <CustomInput
                id="input-service-type"
                type={"text"}
                className="border border-Line rounded-md text-20 text-PrimaryBlue mx-auto p-1.5 w-full bg-transparent"
                value={objSubmit.service_name}
                onChange={(e) => handleChange(e.target.value, "service_name")}
                placeholder="Input service type"
              />
              <ul className="mt-3">
                {/* {services.map((data) => (
                  <li
                    key={vehicles.id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-PrimaryBlue">{data.service_name}</p>
                    <TiDelete
                      id="btn-delete"
                      viewBox="0 0 24 24"
                      fill="#B3B3B3"
                      className="w-6 h-6 cursor-pointer hover:fill-PrimaryRed"
                    />
                  </li>
                ))} */}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <p>Price</p>
              <CustomInput
                id="input-price"
                type={"text"}
                className="border border-Line rounded-md text-20 text-PrimaryBlue mx-auto p-1.5 w-full bg-transparent"
                value={objSubmit.price}
                onChange={(e) => handleChange(e.target.value, "price")}
                placeholder="Input price"
              />

              <ul className="mt-3">
                <li className="flex items-center justify-between">
                  <p className="text-PrimaryRed">asdad</p>
                  <TiDelete
                    id="btn-delete"
                    viewBox="0 0 24 24"
                    fill="#B3B3B3"
                    className="w-6 h-6 cursor-pointer hover:fill-PrimaryRed"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center gap-4">
            <Button
              id="btn-submit"
              className="border-2 border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed px-5 py-1  hover:bg-PrimaryRed hover:text-white cursor-pointer"
              label="SUBMIT"
              onClick={() => handleAddService()}
            />
            <a href="#">
              <Button
                id="btn-cancel"
                className="border-2 border-PrimaryBlue rounded-lg font-semibold text-lg text-PrimaryBlue px-5 py-1  hover:bg-PrimaryBlue hover:text-white cursor-pointer"
                label="CANCEL"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ModalBookingService, ModalComment, ModalAdminAdd, ModalAdminEdit };
