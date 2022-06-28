import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const BookmarkView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bookmark, loading, error } = useAppSelector((state) => state.bookmarks);

  if (loading) {
    return <p>Loading bookmark with id: {id}...</p>;
  }

  if (error || !bookmark) {
    return <p>Error occurred while loading bookmarks</p>;
  }

  return (
    <div style={{ margin: 10, padding: 10, border: '1px solid black' }}>
      <h3>{bookmark.name}</h3>
      <p>URL: {bookmark.url}</p>
      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};
