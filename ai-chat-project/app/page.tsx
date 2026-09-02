"use client";
import { genTextAction } from "@/app/actions/aiAction";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
	id: number;
	text: string;
	sender: "user" | "bot";
};

export default function Home() {
	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const nextMessageId = useRef(1);

	const handleSend = async () => {
		const userPrompt = prompt.trim();
		if (!userPrompt || isLoading) return;

		const userMessage: Message = {
			id: nextMessageId.current++,
			text: userPrompt,
			sender: "user",
		};
		const typingMessage: Message = {
			id: nextMessageId.current++,
			text: "Typing...",
			sender: "bot",
		};

		setMessages((currentMessages) => [
			...currentMessages,
			userMessage,
			typingMessage,
		]);
		setPrompt("");
		setIsLoading(true);

		try {
			const response = await genTextAction(userPrompt);
			setMessages((currentMessages) =>
				currentMessages.map((message) =>
					message.id === typingMessage.id
						? { ...message, text: response }
						: message,
				),
			);
		} catch {
			setMessages((currentMessages) =>
				currentMessages.map((message) =>
					message.id === typingMessage.id
						? {
								...message,
								text: "Sorry, I couldn't generate a response. Please try again.",
							}
						: message,
				),
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="h-screen w-screen p-4">
			<div className="h-[calc(100%-8rem)] overflow-y-auto border border-yellow-400 rounded-2xl p-4 mb-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`inline-full flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
					>
						<div
							className={`leading-7 ${message.sender === "user" ? "bg-blue-500 text-white" : ""} rounded-xl px-4 py-3`}
						>
							<ReactMarkdown>{message.text}</ReactMarkdown>
						</div>
					</div>
				))}
			</div>

			<form
				className="absolute bottom-4 h-28 overflow-hidden border border-green-400 rounded-2xl p-4 mr-4 space-x-4 w-[calc(100%-2rem)] flex items-center"
				onSubmit={(e) => {
					e.preventDefault();
					handleSend();
				}}
			>
				<input
					className="h-full border border-blue-400 rounded-2xl p-4 w-[calc(100%-6rem)] resize-none"
					placeholder="Type your message..."
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer"
					type="submit"
				>
					Send
				</button>
			</form>
		</main>
	);
}
