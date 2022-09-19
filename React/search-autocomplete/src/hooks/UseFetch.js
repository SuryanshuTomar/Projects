import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const fetchData = useCallback(async (url, controller) => {
		try {
			const response = await fetch(url, { signal: controller.signal });
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const json = await response.json();
			setData(json);
			setError(null);
			setIsPending(false);
		} catch (err) {
			setError("Could Not fetch the data");
			setIsPending(false);
			console.log(err.message);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		setIsPending(true);
		fetchData(url, controller);

		return () => {
			controller.abort();
		};
	}, [url, fetchData]);

	return { data, error, isPending };
}

export { useFetch };
