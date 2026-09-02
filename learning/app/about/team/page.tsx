import Button from "@/components/Button";
import FilterUsers from "@/components/FilterUsers";

export default async function Team() {
	const responese = await fetch("https://jsonplaceholder.typicode.com/users");
	const users = await responese.json();

	return (
		<div>
			<h1>Team page</h1>
			<FilterUsers users={users} />
			<Button
				url="https://amar-codingenthusiast.github.io/portfolio"
				text="View Profile"
			/>
		</div>
	);
}
