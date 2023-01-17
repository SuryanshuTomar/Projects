import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ showModal, setShowModal }) {
	const backdropVariant = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const modalVariant = {
		hidden: {
			y: "-100vh",
			opacity: 0,
		},
		visible: {
			y: "200px",
			opacity: 1,
		},
	};

	return (
		<AnimatePresence exitBeforeEnter>
			{showModal && (
				<motion.div
					className="backdrop"
					variants={backdropVariant}
					initial="initial"
					animate="visible"
					exit="hidden"
				>
					<motion.div className="modal" variants={modalVariant}>
						<p>Want to make Another Pizza ? </p>
						<Link to="/">
							<button>Start Again</button>
						</Link>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default Modal;
