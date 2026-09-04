"use client";

import { useEffect, useState } from "react";
import { type Book } from "@/app/api/db";

const Books = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [form, setForm] = useState({ title: "", author: "" });

	const loadBooks = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/books");
			if (!response.ok) throw new Error("Unable to load books.");
			setBooks((await response.json()) as Book[]);
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Unable to load books.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let isCurrent = true;

		const fetchInitialBooks = async () => {
			try {
				const response = await fetch("/api/books");
				if (!response.ok) throw new Error("Unable to load books.");
				const data = (await response.json()) as Book[];
				if (isCurrent) setBooks(data);
			} catch (requestError) {
				if (isCurrent) {
					setError(
						requestError instanceof Error
							? requestError.message
							: "Unable to load books.",
					);
				}
			} finally {
				if (isCurrent) setIsLoading(false);
			}
		};

		void fetchInitialBooks();
		return () => {
			isCurrent = false;
		};
	}, []);

	const resetForm = () => {
		setForm({ title: "", author: "" });
		setEditingId(null);
	};

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSaving(true);
		setError(null);
		setMessage(null);

		try {
			const response = await fetch(
				editingId === null ? "/api/books" : `/api/books/${editingId}`,
				{
					method: editingId === null ? "POST" : "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				},
			);
			if (!response.ok) {
				const result = (await response.json()) as { message?: string };
				throw new Error(result.message ?? "Unable to save book.");
			}

			await loadBooks();
			setMessage(editingId === null ? "Book created." : "Book updated.");
			resetForm();
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Unable to save book.",
			);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("Delete this book?")) return;
		setError(null);
		setMessage(null);
		try {
			const response = await fetch(`/api/books/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Unable to delete book.");
			setBooks((currentBooks) =>
				currentBooks.filter((book) => book.id !== id),
			);
			if (editingId === id) resetForm();
			setMessage("Book deleted.");
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Unable to delete book.",
			);
		}
	};

	const startEditing = (book: Book) => {
		setEditingId(book.id);
		setForm({ title: book.title, author: book.author });
		setMessage(null);
		setError(null);
	};

	return (
		<main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-10">
			<div className="mx-auto max-w-5xl">
				<header className="mb-8 border-b border-slate-200 pb-6">
					<p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
						Library
					</p>
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold tracking-tight text-slate-950">
								Books
							</h1>
							<p className="mt-2 text-slate-600">
								Manage the books in your collection.
							</p>
						</div>
						<button
							type="button"
							onClick={() => void loadBooks()}
							disabled={isLoading}
							className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-600 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Refresh
						</button>
					</div>
				</header>

				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
					<section className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
						<h2 className="text-xl font-semibold text-slate-950">
							{editingId === null ? "Add a book" : "Edit book"}
						</h2>
						<form
							onSubmit={handleSubmit}
							className="mt-5 space-y-4"
						>
							<label className="block text-sm font-medium text-slate-700">
								Title
								<input
									required
									value={form.title}
									onChange={(event) =>
										setForm({
											...form,
											title: event.target.value,
										})
									}
									className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
									placeholder="e.g. The Great Gatsby"
								/>
							</label>
							<label className="block text-sm font-medium text-slate-700">
								Author
								<input
									required
									value={form.author}
									onChange={(event) =>
										setForm({
											...form,
											author: event.target.value,
										})
									}
									className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
									placeholder="e.g. F. Scott Fitzgerald"
								/>
							</label>
							<div className="flex gap-3 pt-2">
								<button
									type="submit"
									disabled={isSaving}
									className="rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-wait disabled:opacity-60"
								>
									{isSaving
										? "Saving..."
										: editingId === null
											? "Create book"
											: "Save changes"}
								</button>
								{editingId !== null && (
									<button
										type="button"
										onClick={resetForm}
										className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
									>
										Cancel
									</button>
								)}
							</div>
						</form>
					</section>

					<section>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-slate-950">
								Your books
							</h2>
							<span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-800">
								{books.length}
							</span>
						</div>
						{message && (
							<p className="mb-4 text-sm text-teal-700">
								{message}
							</p>
						)}
						{error && (
							<p
								className="mb-4 text-sm text-red-700"
								role="alert"
							>
								{error}
							</p>
						)}
						{isLoading ? (
							<div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
								Loading books...
							</div>
						) : books.length === 0 ? (
							<div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
								No books yet. Add your first one.
							</div>
						) : (
							<ul className="space-y-3">
								{books.map((book) => (
									<li
										key={book.id}
										className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
									>
										<div className="min-w-0">
											<h3 className="truncate font-semibold text-slate-950">
												{book.title}
											</h3>
											<p className="mt-1 text-sm text-slate-500">
												by {book.author}
											</p>
										</div>
										<div className="flex shrink-0 gap-2">
											<button
												type="button"
												onClick={() =>
													startEditing(book)
												}
												className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
											>
												Edit
											</button>
											<button
												type="button"
												onClick={() =>
													void handleDelete(book.id)
												}
												className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
											>
												Delete
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</section>
				</div>
			</div>
		</main>
	);
};

export default Books;
