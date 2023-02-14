import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const Widget = ({ type }) => {
	const amount = 100;
	const diff = 20;

	let data;
	switch (type) {
		case "user":
			data = {
				title: "USERS",
				isMoney: false,
				link: "See all users",
				icon: <PersonOutlineIcon className="icon" />,
			};
			break;
		case "order":
			data = {
				title: "ORDERS",
				isMoney: false,
				link: "View all users",
				icon: <ShoppingCartOutlinedIcon className="icon" />,
			};
			break;
		case "earning":
			data = {
				title: "EARNINGS",
				isMoney: true,
				link: "View net earnings",
				icon: <MonetizationOnOutlinedIcon className="icon" />,
			};
			break;
		case "balance":
			data = {
				title: "BALANCE",
				isMoney: true,
				link: "See details",
				icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
			};
			break;
		default:
			break;
	}

	return (
		<div className="widget">
			<div className="left">
				<span className="title">{data.title}</span>
				<span className="counter">
					{data.isMoney && "₹"} {amount}
				</span>
				<span className="link">{data.link}</span>
			</div>
			<div className="right">
				<div className="percentage positive">
					<KeyboardArrowUpIcon />
					{diff}%
				</div>
				{data.icon}
			</div>
		</div>
	);
};
export default Widget;
