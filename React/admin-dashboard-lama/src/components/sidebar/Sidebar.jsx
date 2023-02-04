import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="top">
				<span className="logo">WebMatrix - Admin</span>
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
					<li>
						<Person2Icon className="icon" />
						<span>Users</span>
					</li>
					<li>
						<Inventory2Icon className="icon" />
						<span>Products</span>
					</li>
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
				<div className="colorOption"></div>
				<div className="colorOption"></div>
			</div>
		</div>
	);
};

export default Sidebar;
