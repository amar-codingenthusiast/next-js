import users from "@/data/users.json";

type SkillPageProps = {
	params: Promise<{ name: string; skill: string }>;
};

export default async function SkillPage({ params }: SkillPageProps) {
	// const pageParams = await params;
	// const name = pageParams.name;
	const {name} = await params;
	
	const user = users.find(
		(user) => user.name.toLowerCase() === name.toLowerCase(),
	);

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<div>
			<h1>{user.name}</h1>
			<p>{user.bio}</p>
			<p>Skills: {user.skills.join(", ")}</p>
		</div>
	);
}
