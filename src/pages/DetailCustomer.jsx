import React from "react";
import Layout from "../components/Layout";
import { HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import "../styles/index.css";

function DetailCustomer() {
	return (
		<Layout>
			<div>
				<div class="relative flex mx-2 mt-10 lg:mt-24 lg:mx-64 items-center justify-center">
					<span class="flex-shrink">
						<HiOutlineTruck className="bg-Line rounded-full text-6xl lg:text-8xl text-white p-2 lg:p-4" />
					</span>

					<div class="flex-grow border-t-8 border-Line"></div>
					<span
						class="flex-shrink bg-Line rounded-full text-6xl lg:text-8xl text-white
					
				"
					>
						<HiOutlineClock className="p-2 lg:p-4" />
					</span>
					<div class="flex-grow border-t-8 border-Line"></div>
					<span
						class="flex-shrink  bg-Line rounded-full text-6xl lg:text-8xl text-white
					"
					>
						<HiOutlineCheckCircle className="p-2 lg:p-4" />
					</span>
				</div>
				<div class="relative flex lg:mx-56 py-5 items-center justify-center">
					<span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">Mechanic on the way</span>
					<div class="flex-grow border-t-8 border-white"></div>
					<span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">Service in progress</span>
					<div class="flex-grow border-t-8 border-white"></div>
					<span class="flex-shrink w-36 font-semibold text-sm lg:text-2xl text-black text-center">Service is done</span>
				</div>
			</div>
			<div>
				<div className="mx-2 lg:mx-44 my-5 lg:mb-40 lg:mt-12 border border-SecondaryBlue drop-shadow-md shadow-SecondaryBlue rounded-lg min-w-max">
					<h1 className="font-semibold text-SecondaryBlue text-xs lg:text-4xl text-center mt-16 ">Your Booking is on 3/11/2022</h1>
					<div className="flex lg:grid-rows-2 lg:grid-flow-col justify-evenly mt-12 mb-16">
						<div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2 lg:mb-12">
							<p>Service Type:</p>
							<h1 className="font-bold"> Ganti Oli</h1>
						</div>
						{/* <div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2">
							<p>Invoice:</p>
							<h1 className="font-bold"> Ganti Oli</h1>
						</div> */}
						<div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2 lg:mb-12">
							<p>Vehicle Type:</p>
							<h1 className="font-bold "> CBR 150cc</h1>
						</div>
						{/* <div className="flex flex-wrap place-items-center text-xs lg:text-4xl text-PrimaryBlue gap-2">
							<p>Total Price:</p>
							<h1 className="font-bold "> CBR 150cc</h1>
						</div> */}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default DetailCustomer;
