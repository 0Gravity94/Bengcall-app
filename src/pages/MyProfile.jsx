import React from "react";
import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import Button from "../components/CustomButton";
import profile from "../assets/profile.png";

function MyProfile() {
	return (
		<Layout>
			<div id="layout-profile">
				<div
					id="content"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
				>
					<div
						id="userData"
						className="flex justify-end grid-cols-1 mt-24 mb-20 mx-12"
					>
						<div>
							<img
								id="userPic"
								src={profile}
								alt="profile"
								className="flex justify-center w-full"
							/>
							<Button
								id="change-photo"
								className="flex justify-center items-center text-SecondaryBlue text-xl mt-2.5 cursor-pointer"
								label="Change Photo"
							/>

							<h1
								id="userName"
								className="text-center text-4xl text-PrimaryBlue mt-7"
							>
								Handoko
							</h1>
							<p
								id="userEmail"
								className="text-center text-2xl text-PrimaryBlue"
							>
								handoko@gmail.com
							</p>
							<Button
								id="deactivate"
								className="flex justify-center items-center font-semibold text-PrimaryRed text-xl mt-7 cursor-pointer"
								label="deactivate"
							/>
						</div>
					</div>
					<div
						id="change-userData"
						className="flex flex-wrap justify-start w-full h-screen mt-28 mx-12 px-2"
					>
						<div id="form-userData">
							<div id="form-changeProfile">
								<label
									id="label-fullname"
									className="font-semibold text-2xl text-PrimaryBlue"
								>
									Full Name
								</label>
								<CustomInput
									id="fullname"
									type="text"
									className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
									// value={fullName}
									// onChange={(e) => setFullNamel(e.target.value)}
									placeholder="Input New Full Name"
								/>
								<br />
								<label
									id="label-email"
									className="font-semibold text-2xl text-PrimaryBlue"
								>
									Email
								</label>
								<CustomInput
									id="email"
									type="email"
									className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
									// value={email}
									// onChange={(e) => setEmail(e.target.value)}
									placeholder="Input New Email"
								/>
								<br />
								<label
									id="label-password"
									className="font-semibold text-2xl text-PrimaryBlue"
								>
									Password
								</label>
								<CustomInput
									id="password"
									type="password"
									className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
									// value={password}
									// onChange={(e) => setPassword(e.target.value)}
									placeholder="Input New Password"
								/>
								<Button
									id="button-submit"
									className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer"
									label="Submit"
									// onClick={handleSubmit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default MyProfile;
