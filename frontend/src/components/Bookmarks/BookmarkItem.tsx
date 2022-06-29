import { BookmarkEntity } from 'Models';
import { useNavigate } from 'react-router-dom';

type Props = {
  bookmark: BookmarkEntity;
};

export const BookmarkItem = ({ bookmark }: Props) => {
  const navigate = useNavigate();

  const handleBookmarkSelect = () => {
    navigate(bookmark.id);
  };

  return (
    <div
      style={{ margin: 10, padding: 10, border: '1px solid black', cursor: 'pointer' }}
      onClick={handleBookmarkSelect}
    >
      <h3>{bookmark.name}</h3>
      <p>URL: {bookmark.url}</p>
    </div>
  );
};
