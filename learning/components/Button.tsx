"use client";

type ButtonProps = {
	handleClick?: () => void;
	text: string;
	url?: string;
};

export default function Button({ handleClick, text, url }: ButtonProps) {
	return (
		<button
			className="px-6 py-3 bg-green-400 text-white font-bold rounded-2xl m-2"
			onClick={url ? () => window.open(url) : handleClick}
		>
			{text}
		</button>
	);
}
