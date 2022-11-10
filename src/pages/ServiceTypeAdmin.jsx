import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";

import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListService } from "../components/CardDetail";
import { ModalAdminAdd } from "../components/Modal";

import useTitle from "../utils/useTitle";
import { apiRequest } from "../utils/apiRequest";
import { WithRouter } from "../utils/Navigation";

function ServiceTypeAdmin(props) {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");
  const navigate = useNavigate();
  useTitle("Vehicle List");

  useEffect(() => {
    fetchVehicle();
    // fetchService();
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

  // const fetchService = () => {
  //   const { id } = props.params;
  //   apiRequest(`service/${id}`, "get", {})
  //     .then((res) => {
  //       const results = res.data;
  //       console.log(res);
  //       setServices(results);
  //     })
  //     .catch((err) => {
  //       const { data } = err.response;
  //       alert(data.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

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
        fetchVehicle();
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
        fetchVehicle();
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
            // service={services}
            onDelete={(id) => handleDelete(id)}
            onNavigate={(id) => navigate(`/service-type/${id}`)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WithRouter(ServiceTypeAdmin);
