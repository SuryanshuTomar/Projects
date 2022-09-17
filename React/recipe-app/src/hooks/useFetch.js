import { useState, useEffect } from "react";

// Custom Hook for fetching data
export function useFetch(url, method = "GET") {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);

	const postData = (postData) => {
		setOptions({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
	};

	useEffect(() => {
		// This Abort Controller class is JS itself and has nothing to do with reactjs
		const controller = new AbortController();

		const fetchData = async (url, fetchOptions) => {
			setIsPending(true);
			try {
				// setting the signal using about controllor instance from the AbortController class
				const response = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const resData = await response.json();
				setIsPending(false);
				setData(resData);
				setError(null);
			} catch (err) {
				if (err.name === "AbortError") {
					console.log("fetch call aborted...");
				} else {
					setIsPending(false);
					setError("Could Not fetch the data");
					console.log(err.message);
				}
			}
		};

		if (method === "GET") {
			fetchData(url);
		}
		
		if (method === "POST" && options) {
			fetchData(url, options);
		}

		// clean up function
		return () => {
			// aborting the fetch call in case our component in which useFetch is called gets unmounted
			controller.abort();
		};
	}, [url, method, options]);
	return { data, isPending, error, postData };
}
