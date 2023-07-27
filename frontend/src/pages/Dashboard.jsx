import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import Spinner from "../components/Spinner";
import { getBooks, reset } from "../features/books/bookSlice";
import BookItem from "../components/BookItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message, totalPages } = useSelector(
    (state) => state.book
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchBooks();
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, currentPage]);

  const fetchBooks = async () => {
    try {
      await dispatch(getBooks({ page: currentPage, limit: 4 }));
    } catch (error) {
      console.error(error); // Handle any error that may occur during the fetch
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Books Dashboard</p>
      </section>
      <BookForm />
      <section className="content">
        {books.length > 0 ? (
          <>
            <div className="goals">
              {books.map((book) => (
                <BookItem key={book._id} book={book} />
              ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>{" "}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <h3>No book is in BookStore</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
