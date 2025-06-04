import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authorStorage } from "../../../_api";
import { showAuthor } from "../../../_services/authors";

export default function AuthorShow() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorData] = await Promise.all([showAuthor(id)]);
        setAuthor(authorData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!author) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">Memuat data penulis...</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-center">
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-64 h-[400px] object-cover"
                src={`${authorStorage}/${author.photo}`}
                alt={author.name || "Author"}
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {author.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
