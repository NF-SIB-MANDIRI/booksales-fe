import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [genresData] = await Promise.all([getGenres()]);
      setGenres(genresData);
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Genre List
          </h2>

          {genres.length > 0 ? (
            <ul className="space-y-4">
              {genres.map((genre) => (
                <li key={genre.id} className="border-b border-gray-200 pb-4 dark:border-gray-700">
                  <Link
                    to={`/genres/show/${genre.id}`}
                    className="text-lg font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
                  >
                    {genre.name}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {genre.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">No genres found.</p>
          )}

          {genres.length > 0 && (
            <div className="text-center mt-6">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-indigo-800"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
