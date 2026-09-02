import Card from "@/components/Card";
import { someAction } from "@/app/actions/something";

export default function Home() {
	return (
		<div>
			<p>Hello World</p>
			<Card title="Hello" description="lakfdja sfklasfjaskf sjdfk" />
			<Card title="Amar" description="lakfdja sfklasfjaskf sjdfk" />
			<button onClick={someAction}>Click me</button>
		</div>
	);
}
