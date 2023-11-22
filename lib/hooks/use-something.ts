import { useState, useEffect } from "react";

function useSomething(initialValue: string) {
	// State variable to store the value
	const [value, setValue] = useState(initialValue);

	// useEffect to perform side effects (optional)
	useEffect(() => {
		// You can perform side effects here
		// For example, making an API request or handling subscriptions

		// In this example, we'll just update the value after 3 seconds
		const timeout = setTimeout(() => {
			setValue("New Value");
		}, 3000);

		// Cleanup the timeout to prevent memory leaks
		return () => clearTimeout(timeout);
	}, []);

	// Return the value and a function to update it
	return { value, setValue };
}

export default useSomething;
