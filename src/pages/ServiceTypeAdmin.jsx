import React, { useState, useEffect } from "react";

import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListService } from "../components/CardDetail";
import { ModalAdminAdd } from "../components/Modal";

import useTitle from "../utils/useTitle";
import { apiRequest } from "../utils/apiRequest";

function ServiceTypeAdmin() {
  useTitle("Service List");

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [objSubmit, setObjSubmit] = useState("");

  useEffect(() => {
    fetchVehicle();
    fetchService();
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
    apiRequest("service/:id", "get", {})
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleDelete = async (id) => {
    apiRequest(`admin/service/${id}`, "delete")
      .then((res) => {
        if (res.isConfirmed)
          Swal.fire({
            text: "Class Succesfully Deleted",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
          });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "There is problem on server.",
        });
      })
      .finally(() => {
        fetchVehicle();
        fetchService();
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <NavbarAdmin />
        <div className="w-full h-full flex flex-col items-center  ">
          <div className="w-3/4 flex justify-end ">
            <a href="#my-modal-2">
              <Button
                id="btn-add-vehicle"
                className="border-2 border-PrimaryRed rounded-lg font-semibold text-md  px-5 py-1  bg-PrimaryRed text-white hover:bg-white hover:text-PrimaryRed cursor-pointer mt-12 mb-6"
                label="Add Vehicle"
                // onClick={handleSubmit}
              />
            </a>
            <ModalAdminAdd
              value={objSubmit.name_vehicle}
              onChange={(e) => handleChange(e.target.value, "name_vehicle")}
              addVehicle={() => handleAddVehicle()}
            />
          </div>
          <CardListService
            vehicle={vehicles}
            service={services}
            valueService={objSubmit.service_name}
            valuePrice={objSubmit.price}
            onChangeService={(e) =>
              handleChange(e.target.value, "service_name")
            }
            onChangePrice={(e) => handleChange(e.target.value, "price")}
            addService={() => handleAddService()}
            onDelete={() => handleDelete(id)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServiceTypeAdmin;
