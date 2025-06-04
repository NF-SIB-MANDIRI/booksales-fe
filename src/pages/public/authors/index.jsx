import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorStorage} from "../../../_api";
import { getAuthors } from "../../../_services/authors";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [authorsData] = await Promise.all([getAuthors(),]);
      setAuthors(authorsData);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {authors.length > 0 ? (
              <>
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="h-56 w-full p-2">
                      <Link to="#" className="block w-full h-full">
                        <img
                          className="h-full w-full object-contain rounded-lg mx-auto"
                          src={`${authorStorage}/${author.photo}`}
                          alt={author.title || "author Cover"}
                        />
                      </Link>
                    </div>

                    <div className="pt-6">
                      <div className="flex items-center gap-x-4 flex-wrap">
                        <Link
                          to={`/authors/show/${author.id}`}
                          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                        >
                          {author.name}
                        </Link>
                      </div>

                      <div className="mt-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {author.bio}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <Link
                          to={`/authors/show/${author.id}`}
                          className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                No authors found
              </p>
            )}
          </div>

          {authors.length > 0 && (
            <div className="w-full text-center mt-4">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
