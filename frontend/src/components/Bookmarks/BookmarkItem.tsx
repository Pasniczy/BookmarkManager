import { BookmarkEntity } from 'Models';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import StarOutlineSharpIcon from '@mui/icons-material/StarOutlineSharp';
import StarSharpIcon from '@mui/icons-material/StarSharp';
import { editBookmark, deleteBookmark } from 'Actions';

type Props = {
  bookmark: BookmarkEntity;
};

export const BookmarkItem = ({ bookmark }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(bookmark.id);
  };

  const handleAddBookmarkToFavorites = () => {
    const updatedBookmark = { ...bookmark, favorite: !bookmark.favorite };
    dispatch(editBookmark(bookmark.id, updatedBookmark));
  };

  const handleEditBookmark = () => {
    navigate(`/bookmarks/edit/${bookmark.id}`);
  };

  const handleDeleteBookmark = () => {
    dispatch(deleteBookmark(bookmark.id, navigate));
  };

  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Link href={bookmark.url}>
            <Typography variant="h6" component="h4" style={{ marginBottom: 4 }}>
              {bookmark.name}
            </Typography>
          </Link>
        </Box>
        {bookmark.favorite ? (
          <StarSharpIcon color="warning" style={{ cursor: 'pointer' }} onClick={handleAddBookmarkToFavorites} />
        ) : (
          <StarOutlineSharpIcon style={{ cursor: 'pointer' }} onClick={handleAddBookmarkToFavorites} />
        )}
      </Box>
      <ButtonGroup variant="outlined" size="small" aria-label="outlined primary button group" style={{ marginTop: 10 }}>
        <Button onClick={handleSeeDetails} color="primary">
          See details
        </Button>
        <Button onClick={handleEditBookmark} color="warning">
          Edit
        </Button>
        <Button onClick={handleDeleteBookmark} color="error">
          Delete
        </Button>
      </ButtonGroup>
    </Paper>
  );
};
