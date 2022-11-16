import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListService } from "../components/CardDetail";
import { ModalAdminAdd, ModalAdminEdit } from "../components/Modal";

import useTitle from "../utils/useTitle";
import { apiRequest } from "../utils/apiRequest";
import { WithRouter } from "../utils/Navigation";

function ServiceTypeAdmin(props) {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");
  const navigate = useNavigate();
  useTitle("Vehicle List");

  useEffect(() => {
    fetchDataAll();
  }, []);

  const fetchVehicle = () => {
    apiRequest("vehicle", "get", {})
      .then((res) => {
        const results = res.data;
        setVehicles(results);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchService = () => {
    apiRequest(`service/3`, "get", {})
      .then((res) => {
        const results = res.data;
        console.log(results);
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

  const fetchDataAll = () => {
    apiRequest(`admin/vehicleservice`, "get", {})
      .then((res) => {
        const results = res.data;
        setDataAll(results);
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddVehicle = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest("admin/vehicle", "post", objSubmit, "multipart/form-data")
      .then((res) => {
        alert("New Vehicle Added");
        setObjSubmit({});
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        fetchDataAll();
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
        fetchDataAll();
        setLoading(false);
      });
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleDelete = async (id) => {
    apiRequest(`admin/vehicle/${id}`, "delete")
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        fetchDataAll();
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <NavbarAdmin />
        <div className="w-full h-full flex flex-col items-center  ">
          <div className="w-3/4 flex justify-end gap-4 ">
            <a href="#my-modal-2">
              <Button
                id="btn-add-vehicle"
                className="border-2 border-PrimaryRed rounded-lg font-semibold text-md  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer mt-12 mb-6"
                label="Add Vehicle"
                // onClick={handleSubmit}
              />
            </a>
            <a href="#my-modal-3">
              <Button
                id="btn-add-vehicle"
                className="border-2 border-PrimaryRed rounded-lg font-semibold text-md  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer mt-12 mb-6"
                label="Edit Service"
                // onClick={handleSubmit}
              />
            </a>

            <ModalAdminAdd
              value={objSubmit.name_vehicle}
              onChange={(e) => handleChange(e.target.value, "name_vehicle")}
              addVehicle={() => handleAddVehicle()}
            />
            <ModalAdminEdit />
          </div>
          <CardListService
            vehicles={dataAll}
            key={dataAll.id}
            services={dataAll.services}
            addService={() => handleAddService()}
            serviceChange={(e) => handleChange(e.target.value, "service_name")}
            priceChange={(e) => handleChange(e.target.value, "price")}
            serviceVal={objSubmit.service_name}
            priceVal={objSubmit.price}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WithRouter(ServiceTypeAdmin);
