import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const buttonVariants = {
	hover: {
		// scale: [1, 1.1, 1, 1.1, 1, 1.1, 1], // keyframes
		scale: 1.1,
		textShadow: "0 0 8px rgb(255, 255, 255)", // white shadow
		boxShadow: "0 0 8px white", // white shadow
		transition: {
			// yoyo: 10 // no of keyframes
			yoyo: Infinity, // infinite
			duration: 0.3
		},
	},
};

const Home = () => {
	return (
		<motion.div
			className="home container"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				delay: 1,
				duration: 1.5,
			}}
		>
			<h2>Welcome to Pizza Joint</h2>
			<Link to="/base">
				<motion.button variants={buttonVariants} whileHover="hover">
					Create Your Pizza
				</motion.button>
			</Link>
		</motion.div>
	);
};

export default Home;
