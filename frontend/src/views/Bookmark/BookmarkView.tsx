import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { getBookmark } from '../../actions/bookmarks';

export const BookmarkView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const { bookmark, loading, error } = useAppSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading bookmark with id: {id}...</p>;
  }

  if (error || !bookmark) {
    return <p>Error occurred while loading bookmark</p>;
  }

  return (
    <div style={{ margin: 10, padding: 10, border: '1px solid black' }}>
      <h3>{bookmark.name}</h3>
      <p>URL: {bookmark.url}</p>
      <p>Favorite: {bookmark.favorite.toString()}</p>
      <button type="button" onClick={() => navigate('/bookmarks')}>
        Go back
      </button>
    </div>
  );
};
