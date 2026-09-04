import books, { type Book } from "@/app/api/db";

export const GET = () => {
	return Response.json(books);
};

export const POST = async (request: Request) => {
	const data = (await request.json()) as Partial<Book>;
	if (typeof data.title !== "string" || typeof data.author !== "string") {
		return Response.json(
			{ message: "Title and author are required." },
			{ status: 400 },
		);
	}

	const book: Book = {
		id: Math.max(0, ...books.map(({ id }) => id)) + 1,
		title: data.title,
		author: data.author,
	};
	books.push(book);
	return Response.json(book, { status: 201 });
};
