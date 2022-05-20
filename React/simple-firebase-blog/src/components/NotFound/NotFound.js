import React from "react";
import styled from "styled-components";

export const NotFound = () => {
	return <NotFoundText>404 NotFound</NotFoundText>;
};

const NotFoundText = styled.h1`
	margin: 40px;
	text-align: center;
`;
