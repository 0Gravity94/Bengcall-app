import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/CustomButton";
import { CardListAdmin } from "../components/CardDetail";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { WithRouter } from "../utils/Navigation";

function DashboardAdmin() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiRequest("admin/transaction", "get", {})
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
          {datas.length > 0 ? (
            datas &&
            datas.map((data) => (
              <CardListAdmin
                key={data.id}
                number={data.id}
                invoice={data.invoice}
                fullname={data.fullname}
                date={data.date}
                price={data.total}
                status={data.status}
                onNavigate={() => navigate(`/detailadmin/${data.id}`)}
              />
            ))
          ) : (
            <div className="w-full h-screen flex justify-center items-center text-center ">
              <p className="text-4xl font-extrabold  text-PrimaryBlue">
                "There's nothing to do in here"
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WithRouter(DashboardAdmin);
