import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const containerVariants = {
	hidden: {
		opacity: 0,
		x: "100vw",
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			// delay: 0.5,
			type: "spring",
			mass: 0.8, // how much heaving is element
			damping: 10, // decrease the force of spring type
			// stiffness: 120,
			when: "beforeChildren", // animation variant orchestration
			staggerChildren: 1.1, // in secs
		},
	},
	exit: {
		x: "-100vw",
		transition: {
			ease: "easeInOut",
		},
	},
};

const childVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

const Order = ({ pizza, setShowModal }) => {
	useEffect(() => {
		setTimeout(() => setShowModal(true), 5000);
	}, [setShowModal]);

	return (
		<motion.div
			className="container order"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<h2>Thank you for your order :)</h2>
			<motion.p variants={childVariants}>
				You ordered a {pizza.base} pizza with:
			</motion.p>
			<motion.div variants={childVariants}>
				{pizza.toppings.map((topping) => (
					<div key={topping}>{topping}</div>
				))}
			</motion.div>
		</motion.div>
	);
};

export default Order;
