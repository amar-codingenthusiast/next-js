"use client"
import { useState } from "react";

type User = {
	id: number;
	name: string;
	email: string;
};

export default function FilterUsers({users}: { users: User[] }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

	return (
		<div>
            <input
                type="text"
                className="border p-2 mb-4"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
			<ul>
				{filteredUsers.map((user: User) => (
					<li key={user.id}>
						{user.name} - {user.email}
					</li>
				))}
			</ul>
		</div>
	);
}
