import React, { createContext, ReactElement, useState, useEffect } from "react";

// SKU, in full stock keeping unit, a code number, typically used as a machine-readable bar code, assigned to a single item of inventory. As part of a system for inventory control, the SKU represents the smallest unit of a product that can be sold from inventory, purchased, or added to inventory.
export type ProductType = {
	sku: string;
	name: string;
	price: number;
};

// const initialState: ProductType[] = [];

const initialState: ProductType[] = [
	{
		sku: "item0001",
		name: "Widget",
		price: 9.99,
	},
	{
		sku: "item0002",
		name: "Premium Widget",
		price: 19.99,
	},
	{
		sku: "item0003",
		name: "Deluxe Widget",
		price: 29.99,
	},
];

export type UseProductsContextType = { products: ProductType[] };

const initialContextState: UseProductsContextType = { products: [] };

const ProductsContext =
	createContext<UseProductsContextType>(initialContextState);

type ChildrenType = {
	children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
	const [products, setProducts] = useState<ProductType[]>(initialState);

	// fetching products from json server
	// useEffect(() => {
	// 	const fetchProducts = async (): Promise<ProductType[]> => {
	// 		const data = await fetch("http://localhost:3500/products")
	// 			.then((response) => response.json())
	// 			.catch((error) => {
	// 				if (error instanceof Error) console.log(error);
	// 			});
	// 		return data;
	// 	};

	// 	fetchProducts().then((products) => setProducts(products));
	// }, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContext;
