import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import "./sidebar.scss";

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
	const { dispatch } = useContext(DarkModeContext);

	return (
		<div className="sidebar">
			<div className="top">
				<NavLink to="/" style={{ textDecoration: "none" }}>
					<span className="logo">Matrix - Admin</span>
				</NavLink>
			</div>

			<hr />
			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<li>
						<DashboardIcon className="icon" />
						<span>Dashoard</span>
					</li>

					<p className="title">LISTS</p>
					<Link
						to="/users"
						style={{ textDecoration: "none", color: "gray" }}
					>
						<li>
							<Person2Icon className="icon" />
							<span>Users</span>
						</li>
					</Link>
					<Link
						to="/products"
						style={{ textDecoration: "none", color: "gray" }}
					>
						<li>
							<Inventory2Icon className="icon" />
							<span>Products</span>
						</li>
					</Link>
					<li>
						<PointOfSaleOutlinedIcon className="icon" />
						<span>Orders</span>
					</li>
					<li>
						<LocalShippingIcon className="icon" />
						<span>Delivery</span>
					</li>

					<p className="title">USEFUL</p>
					<li>
						<QueryStatsIcon className="icon" />
						<span>Stats</span>
					</li>
					<li>
						<NotificationsIcon className="icon" />
						<span>Notifications</span>
					</li>

					<p className="title">SERVICE</p>
					<li>
						<MedicalInformationIcon className="icon" />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyIcon className="icon" />
						<span>Logs</span>
					</li>
					<li>
						<SettingsIcon className="icon" />
						<span>Settings</span>
					</li>

					<p className="title">SERVICE</p>
					<li>
						<FaceIcon className="icon" />
						<span>Profile</span>
					</li>
					<li>
						<LogoutIcon className="icon" />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<div className="bottom">
				<div
					className="colorOption"
					onClick={() => dispatch({ type: "LIGHT" })}
				></div>
				<div
					className="colorOption"
					onClick={() => dispatch({ type: "DARK" })}
				></div>
			</div>
		</div>
	);
};

export default Sidebar;
