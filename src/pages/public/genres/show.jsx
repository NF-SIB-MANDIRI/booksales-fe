import { useEffect, useState } from "react";
import { showGenre } from "../../../_services/genres";
import { useParams, Link } from "react-router-dom";

export default function GenreShow() {
  const { id } = useParams();
  const [genre, setGenre] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const [genreData] = await Promise.all([showGenre(id)]);
      setGenre(genreData);
    };

    fetchData();
  }, [id]);

  return (
    <section className="py-12 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {genre.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {genre.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {genre.books && genre.books.length > 0 ? (
            genre.books.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden"
              >
                <Link to={`/books/show/${book.id}`}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-60 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {book.author?.name || "Unknown Author"}
                  </p>
                  <Link
                    to={`/books/show/${book.id}`}
                    className="inline-block mt-3 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 col-span-full">
              No books found in this genre.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
