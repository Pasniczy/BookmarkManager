import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { getBookmarks } from '../../actions/bookmarks';
import { BookmarkItem } from '../../components/Bookmarks/BookmarkItem';

export const BookmarksView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  const { bookmarks, loading, error } = useAppSelector((state) => state.bookmarks);

  if (loading) {
    return <p>Loading bookmarks...</p>;
  }

  if (error) {
    return <p>Error occurred while loading bookmarks</p>;
  }

  return (
    <div>
      <h1>Bookmarks</h1>
      <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/bookmarks/add">Add bookmark</Link>
        </li>
      </ul>
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};
