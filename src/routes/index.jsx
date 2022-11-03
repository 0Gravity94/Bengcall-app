import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardAdmin from "../pages/DashboardAdmin";
import DetailCustomer from "../pages/DetailCustomer";
import History from "../pages/History";
import HomePage from "../pages/HomePage";
import MyProfile from "../pages/MyProfile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Login />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/register"
					element={<Register />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/dashboard"
					element={<DashboardAdmin />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/home"
					element={<HomePage />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/myprofile"
					element={<MyProfile />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/detail/:id"
					element={<DetailCustomer />}
				/>
			</Routes>
			<Routes>
				<Route
					path="/history"
					element={<History />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
