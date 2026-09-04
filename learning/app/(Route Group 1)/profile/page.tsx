"use client";
import users from "@/data/users.json";
// import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();
	return (
		<div>
			<ul>
				{users.map((user) => (
					<li key={user.id} className="flex gap-4 p-4 items-center">
						<h2>{user.name}</h2>
						<Button
							handleClick={() =>
								router.push(
									`/profile/${user.name.toLocaleLowerCase()}`,
								)
							}
							text="View Profile"
						/>
						{/* <Link
							href={`/profile/${user.name.toLocaleLowerCase()}`}
							className="px-6 py-3 bg-green-400 text-white font-bold rounded-2xl m-2"
						>
							View Profile
						</Link> */}
						{/* Use Link tag without making use client for relative and absolute urls */}
					</li>
				))}
			</ul>
		</div>
	);
}
