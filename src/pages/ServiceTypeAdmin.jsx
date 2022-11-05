import React from "react";

import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListService } from "../components/CardDetail";
import { ModalAdminAdd } from "../components/Modal";

function ServiceTypeAdmin() {
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
            <ModalAdminAdd />
          </div>
          <CardListService />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServiceTypeAdmin;
