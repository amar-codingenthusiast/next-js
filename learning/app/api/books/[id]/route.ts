import books, { type Book } from "@/app/api/db";

type BookRouteContext = { params: Promise<{ id: string }> };

const findBook = async ({ params }: BookRouteContext) => {
	const { id } = await params;
	return books.findIndex((book) => book.id === Number(id));
};

export const GET = async (_request: Request, context: BookRouteContext) => {
	const bookIndex = await findBook(context);
	if (bookIndex === -1) {
		return Response.json({ message: "Book not found." }, { status: 404 });
	}
	return Response.json(books[bookIndex]);
};

export const PUT = async (
	request: Request,
	context: BookRouteContext,
) => {
	const bookIndex = await findBook(context);
	if (bookIndex === -1) {
		return Response.json({ message: "Book not found." }, { status: 404 });
	}

	const data = (await request.json()) as Partial<Book>;
	if (typeof data.title !== "string" || typeof data.author !== "string") {
		return Response.json(
			{ message: "Title and author are required." },
			{ status: 400 },
		);
	}

	const book: Book = {
		id: books[bookIndex].id,
		title: data.title,
		author: data.author,
	};
	books[bookIndex] = book;
	return Response.json(book);
};

export const DELETE = async (_request: Request, context: BookRouteContext) => {
	const bookIndex = await findBook(context);
	if (bookIndex === -1) {
		return Response.json({ message: "Book not found." }, { status: 404 });
	}
	books.splice(bookIndex, 1);
	return new Response(null, { status: 204 });
};
