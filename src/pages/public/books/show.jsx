import { useEffect, useState } from "react";
import { showBook } from "../../../_services/books";
import { useNavigate, useParams } from "react-router-dom";
import { bookStorage } from "../../../_api";
import { createTransaction } from "../../../_services/transactions";

export default function BookShow() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const [bookData] = await Promise.all([showBook(id)]);
      setBook(bookData);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        book_id: id,
        quantity: quantity,
      };

      await createTransaction(payload);
      alert("Transaction succesfully");
      navigate("/books");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-sm mx-auto lg:max-w-full flex items-center justify-center">
              <img
                className="w-64 h-[400px] object-cover rounded-xl shadow-md"
                src={`${bookStorage}/${book.cover_photo}`}
                alt={book.title}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Stock : {book.stock}
              </p>

              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp{book.price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (5.0)
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 sm:mt-8 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Jumlah
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 sm-text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center"
                  >
                    Buy Book
                  </button>
                </form>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
