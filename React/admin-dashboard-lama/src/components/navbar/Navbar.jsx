import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LanguageIcon from "@mui/icons-material/Language";
import ListIcon from "@mui/icons-material/List";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
	const { dispatch } = useContext(DarkModeContext);

	return (
		<div className="navbar">
			<div className="wrapper">
				<div className="search">
					<input type="text" placeholder="search..." />
					<SearchIcon className="icon" />
				</div>

				<div className="items">
					<div className="item">
						<LanguageIcon className="icon" />
						English
					</div>
					<div
						className="item"
						onClick={() => dispatch({ type: "TOGGLE" })}
					>
						<DarkModeOutlinedIcon className="icon" />
					</div>
					<div className="item">
						<FullscreenExitIcon className="icon" />
					</div>
					<div className="item">
						<NotificationsNoneIcon className="icon" />
						<div className="counter">1</div>
					</div>
					<div className="item">
						<ChatBubbleOutlineIcon className="icon" />
						<div className="counter">2</div>
					</div>
					<div className="item">
						<ListIcon className="icon" />
					</div>
					<div className="item">
						<img
							src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
							alt="user image"
							className="avatar"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
