import { useState, useEffect } from "react";

// Custom Hook for fetching data
export function useFetch(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		// This Abort Controller class is JS itself and has nothing to do with reactjs
		const controller = new AbortController();

		const fetchData = async (url) => {
			setIsPending(true);
			try {
				// setting the signal using about controllor instance from the AbortController class
				const response = await fetch(url, { signal: controller.signal });
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
		fetchData(url);

		// clean up function
		return () => {
			// aborting the fetch call in case our component in which useFetch is called gets unmounted
			controller.abort();
		};
	}, [url]);
	return { data, isPending, error };
}
