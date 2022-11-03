import React from "react";
import "../styles/index.css";
import { NavbarUser } from "./Navbar";

function Layout({ children }) {
	return (
		<div>
			<NavbarUser />
			<div className="w-full h-full">{children}</div>
			{/* <Footer /> */}
		</div>
	);
}

export default Layout;
