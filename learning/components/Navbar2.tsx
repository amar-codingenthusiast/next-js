import Link from "next/link";

export default function Navbar2() {
	return (
		<nav className="flex justify-between gap-4 font-bold bg-blue-400 p-4">
			<p> Route Group 2</p>
			<div className="flex gap-4">
				<Link href="/">Home</Link>
				<Link href="/users">Users</Link>
				<Link href="/courses">Courses</Link>
				<Link href="/books">Books</Link>
			</div>
		</nav>
	);
}
