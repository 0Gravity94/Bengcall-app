import React from "react";

import { HiPhone, HiLocationMarker } from "react-icons/hi";

function Footer() {
	return (
		<div
			id="footer"
			className="w-full h-20 flex justify-between items-center bg-PrimaryBlue"
		>
			<div className="flex-1 ml-2 md:ml-6 normal-case text-3xl font-extrabold">
				<span className="text-white">Beng</span>
				<span className="text-PrimaryRed">Call</span>
			</div>
			<div className="flex flex-col md:flex-row gap-2 md:gap-8 mr-2 md:mr-6 ">
				<div className="flex gap-1 items-center text-white">
					<HiPhone
						viewBox="0 0 24 24"
						fill="#FFF"
						className="w-6 h-6"
					/>
					<p>+62 888 2122 2244</p>
				</div>
				<div className="flex gap-1 items-center text-white">
					<HiLocationMarker
						viewBox="0 0 24 24"
						fill="#FFF"
						className="w-6 h-6"
					/>
					<p>Jl. Pahlawan No. 32 Surabaya</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
