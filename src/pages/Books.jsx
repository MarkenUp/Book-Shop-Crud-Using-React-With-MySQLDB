import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { AddBook } from "../components";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateBooks = (newBook) => {
    setBooks([...books, newBook]);
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div className="mt-10">
      <div>
        <h1 className="ml-20 font-bold text-3xl">Book Shop</h1>
        <div className="flex flex-wrap mt-10 lg:flex-row-reverse gap-4 justify-center">
          {books.map((book) => (
            <div
              className="max-w-xs bg-white p-6 rounded-lg shadow-md w-full lg:w-1/5 mb-4 lg:mb-0"
              key={book.id}
            >
              {books.cover && (
                <img
                  className="w-full h-40 object-cover mb-4 rounded-md"
                  src={book.cover}
                  alt=""
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-4">{book.desc}</p>
              <span className="text-green-500 font-bold text-md">
                &#8369;{book.price}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-20">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Add New Book
          </button>

          {/* is Modal Open */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-md relative">
                <button
                  className="absolute top-2 right-5 text-xl text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <MdClose />
                </button>
                <AddBook closeModal={closeModal} updateBooks={updateBooks} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
