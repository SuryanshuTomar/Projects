import React from "react";
import { Route, Routes, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import Home from "./Home";
import Cuisine from "./Cuisine";

function Pages() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cuisine/:cuisineType" element={<Cuisine />} />
		</Routes>
	);
}

export default Pages;
