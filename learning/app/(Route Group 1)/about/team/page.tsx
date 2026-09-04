// Server fetching
"use cache" // use cache reduces api calls and memorizes data
import Button from "@/components/Button";
import FilterUsers from "@/components/FilterUsers";

export default async function Team() {
	const responese = await fetch("https://jsonplaceholder.typicode.com/users");
	if(!responese.ok) throw new Error("Failed to fetch users");
	const users = await responese.json();

	return (
		<div>
			<h1>Team page</h1>
			<FilterUsers users={users} />
			<Button
				url="https://amar-codingenthusiast.github.io/portfolio"
				text="Visit site"
			/>
		</div>
	);
}

// Client fetching
// "use client";
// import Button from "@/components/Button";
// import FilterUsers from "@/components/FilterUsers";
// import { useState, useEffect } from "react";

// export default function Team() {
// 	const [users, setUsers] = useState([]);

// 	useEffect(() => {
// 		const fetchUsers = async () => {
// 			try {
// 				const response = await fetch("https://jsonplaceholder.typicode.com/users");
// 				if (!response.ok) throw new Error("Failed to fetch users");
// 				const userData = await response.json();
// 				setUsers(userData);
// 			} catch (error) {
// 				console.log("Error fetching users:", error);
// 			}
// 		};
// 		fetchUsers();
// 	}, []);

// 	return (
// 		<div>
// 			<h1>Team page</h1>
// 			<FilterUsers users={users} />
// 			<Button
// 				url="https://amar-codingenthusiast.github.io/portfolio"
// 				text="Visit site"
// 			/>
// 		</div>
// 	);
// }