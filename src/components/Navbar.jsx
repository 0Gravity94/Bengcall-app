import React from "react";

import { HiWrenchScrewdriver, HiUser, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";

function NavbarUser() {
	return (
		<div
			id="navbar-user"
			className="w-full shadow-md shadow-SecondaryBlue"
		>
			<div className="navbar bg-white">
				<div className="dropdown">
					<label
						tabIndex={0}
						className="btn btn-ghost lg:hidden"
					>
						<GiHamburgerMenu />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 border-Line shadow-md bg-base-100 rounded-box w-52"
					>
						<li>
							<a className="btn-ghost">
								<HiWrenchScrewdriver
									viewBox="0 0 24 24"
									fill="#669BBC"
									className="w-8 h-8"
								/>
							</a>
						</li>
						<li tabIndex={0}>
							<a className="btn-ghost justify-between">
								<HiUser
									viewBox="0 0 24 24"
									fill="#669BBC"
									className="w-8 h-8"
								/>
							</a>
							<ul className="p-2 bg-white shadow-md border-Line">
								<li className="text-PrimaryBlue">
									<a className="w-full flex justify-center btn-ghost">My Profile</a>
								</li>
								<li className="text-PrimaryBlue">
									<a className="w-full flex justify-center btn-ghost">History</a>
								</li>
								<li className="text-PrimaryBlue">
									<a className="w-full flex justify-center btn-ghost">Logout</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className="flex-1 ml-2 lg:ml-6">
					<a className="btn btn-ghost normal-case text-3xl font-extrabold">
						<span className="text-PrimaryBlue">Beng</span>
						<span className="text-PrimaryRed">Call</span>
					</a>
				</div>
				<div className="hidden lg:flex gap-6 mr-6">
					<button className="btn btn-square btn-ghost">
						<HiWrenchScrewdriver
							viewBox="0 0 24 24"
							fill="#669BBC"
							className="w-8 h-8"
						/>
					</button>
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost rounded-btn"
						>
							<HiUser
								viewBox="0 0 24 24"
								fill="#669BBC"
								className="w-8 h-8"
							/>
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content p-2 bg-white rounded-box w-44 border shadow-md"
						>
							<li className="text-PrimaryBlue">
								<a className="w-full flex justify-center">My Profile</a>
							</li>
							<li className="text-PrimaryBlue">
								<a className="w-full flex justify-center">History</a>
							</li>
							<li className="text-PrimaryBlue">
								<a className="w-full flex justify-center">Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

function NavbarAdmin() {
	return (
		<div
			id="navbar-admin"
			className="w-full shadow-md shadow-SecondaryBlue"
		>
			<div className="navbar bg-white">
				<div className="flex-1 ml-6">
					<a className="btn btn-ghost normal-case text-3xl font-extrabold">
						<span className="text-PrimaryBlue">Beng</span>
						<span className="text-PrimaryRed">Call</span>
					</a>
				</div>
				<div className="mr-6">
					<button className="btn btn-square btn-ghost">
						<HiArrowLeftOnRectangle
							strokeWidth={2}
							stroke="#C1121F"
							viewBox="0 0 24 24"
							className="w-8 h-8"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export { NavbarUser, NavbarAdmin };
