import { Link } from "react-router-dom";
// import axios from "axios";
// import { useCookies } from "react-cookie";

import { CustomInput } from "../../components/CustomInput";
import Button from "../../components/CustomButton";
import LogReg from "../../assets/LogReg.png";
import useTitle from "../../utils/useTitle";

function Register() {
	// const [cookie, setCookie] = useCookies(["token"])
	// const navigate = useNavigate();
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	useTitle("Register");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
			<div className="hidden md:flex lg:flex w-full h-full">
				<img
					src={LogReg}
					alt="Bengcall"
					className="w-full"
				/>
			</div>
			<div className="flex flex-wrap justify-center w-full h-screen mt-28 px-2">
				<div>
					<h1 className="font-bold text-5xl text-center text-PrimaryBlue my-14">Sign Up</h1>
					<div>
						<label className="font-semibold text-2xl text-PrimaryBlue">Full Name</label>
						<CustomInput
							id="fullname"
							type="text"
							className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
							// value={fullName}
							// onChange={(e) => setFullNamel(e.target.value)}
							placeholder="Input Full Name"
						/>
						<br />
						<label className="font-semibold text-2xl text-PrimaryBlue">Email</label>
						<CustomInput
							id="email"
							type="email"
							className="border border-Line rounded-md text-20 mx-auto mt-2.5 mb-7 p-4 w-full h-14 max-w-md"
							// value={email}
							// onChange={(e) => setEmail(e.target.value)}
							placeholder="Input email"
						/>
						<br />
						<label className="font-semibold text-2xl text-PrimaryBlue">Password</label>
						<CustomInput
							id="password"
							type="password"
							className="border border-Line rounded-md text-20 mx-auto mt-2.5 p-4 w-full h-14 max-w-md"
							// value={password}
							// onChange={(e) => setPassword(e.target.value)}
							placeholder="Input password"
						/>
						<p className="text-base lg:text-xl text-center mt-7 mb-10">
							Already have an account?{" "}
							<Link
								id="login"
								to="/"
								className="text-PrimaryRed font-semibold"
							>
								Sign in here.
							</Link>
						</p>
						<Button
							id="button-submit"
							className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-2xl text-PrimaryRed m-auto w-52 h-14 max-w-xs cursor-pointer"
							label="Sign Up"
							// onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
