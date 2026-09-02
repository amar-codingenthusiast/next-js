import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex gap-4 font-bold bg-blue-400 p-4">
			<Link href="/">Home</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
			<Link href="/about/team">Team</Link>
			<Link href="/profile">Profile</Link>
			{/* <Link href="/profile/name">profile/[name]</Link> */}
			{/* <Link href="/profile/name/skill">profile/[name]/[skill]</Link> */}
		</nav>
	);
}
