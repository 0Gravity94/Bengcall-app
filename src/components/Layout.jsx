import React from "react";
import "../styles/index.css";
import { NavbarUser } from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <NavbarUser />
      <div className="bg-white w-full h-full">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
