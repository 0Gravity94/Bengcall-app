import React from "react";
import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListAdmin } from "../components/CardDetail";
import { Link } from "react-router-dom";

function DashboardAdmin() {
  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <NavbarAdmin />
        <div className="w-full h-full flex flex-col items-center  ">
          <div className="w-3/4 flex justify-end ">
            <Link to="/service-type">
              <Button
                id="btn-service-type"
                className="border-2 border-SecondaryBlue rounded-lg font-semibold text-md  px-5 py-1  bg-SecondaryBlue text-white hover:bg-white hover:text-SecondaryBlue cursor-pointer mt-12 mb-6"
                label="Service Type"
                // onClick={handleSubmit}
              />
            </Link>
          </div>
          <CardListAdmin />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardAdmin;
