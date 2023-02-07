import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/cartSlice";
import { fetchProducts, getProducts, STATUS } from "../features/productSlice";

const Products = () => {
	const dispatch = useDispatch();
	const { data: products, status } = useSelector(getProducts);

	useEffect(() => {
		dispatch(fetchProducts("https://fakestoreapi.com/products"));
	}, []);

	const handleAdd = (product) => {
		dispatch(add(product));
	};

	if (status === STATUS.LOADING) {
		return <h2>Loading...</h2>;
	} else if (status === STATUS.ERROR) {
		return <h2>Something Went Wrong...</h2>;
	}

	return (
		<div className="productsWrapper">
			{products.map((product) => (
				<div className="card" key={product.id}>
					<img src={product.image} alt="" />
					<h4>{product.title}</h4>
					<h5>{product.price}</h5>
					<button onClick={() => handleAdd(product)} className="btn">
						Add to cart
					</button>
				</div>
			))}
		</div>
	);
};

export default Products;
