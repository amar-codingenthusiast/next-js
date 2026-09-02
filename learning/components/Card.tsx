type CardProps = {
	title: string;
	description: string;
};

export default function Card({ title, description }: CardProps) {
	return (
		<div className="bg-pink-400 text-black">
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
	);
}
