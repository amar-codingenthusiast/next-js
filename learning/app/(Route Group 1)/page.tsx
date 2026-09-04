import Card from "@/components/Card";
import { someAction } from "@/actions/something";

export default function Home() {
	return (
		<div>
			<p>Hello World</p>
			<Card title="Hello" description="lakfdja sfklasfjaskf sjdfk" />
			<Card title="Amar" description="lakfdja sfklasfjaskf sjdfk" />
			<button
				className="px-6 py-3 bg-green-400 text-white font-bold rounded-2xl m-2"
				onClick={someAction}
			>
				Server Action
			</button>
		</div>
	);
}
