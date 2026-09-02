import users from "@/data/users.json";

type SkillPageProps = {
	params: Promise<{ name: string; skill: string }>;
};

export default async function SkillPage({ params }: SkillPageProps) {
	// const pageParams = await params;
	// const name = pageParams.name;
	// const skill = pageParams.skill;
	const { name, skill } = await params;

	const user = users.find(
		(user) => user.name.toLowerCase() === name.toLowerCase(),
	);
	const skillExists = user?.skills.some(
		(userSkill) => userSkill.toLowerCase() === skill.toLowerCase(),
	);

	if (!user) {
		return <div>User not found</div>;
	}
    
	return (
		<>
			{skillExists ? (
				<div>
					<h1>{user.name}</h1>
					<p>{user.bio}</p>
					<p>{skill} exists in the user&apos;s skills.</p>
				</div>
			) : (
				<div>
					<h1>{user.name}</h1>
					<p>{user.bio}</p>
					<p>{skill} does not exist in the user&apos;s skills.</p>
				</div>
			)}
		</>
	);
}
