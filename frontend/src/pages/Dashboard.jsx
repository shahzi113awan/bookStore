import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookForm from '../components/BookForm';
import Spinner from '../components/Spinner';
import { getBooks, reset } from '../features/books/bookSlice';
import BookItem from '../components/BookItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector((state) => state.books); 

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getBooks());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch, message]);
  
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
       {books.map((book)=> (
        <BookItem key = {book._id} book = {book}/>
       ) )}
      </section>
    </>
  );
};

export default Dashboard;