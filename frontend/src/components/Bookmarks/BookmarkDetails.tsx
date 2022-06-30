import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BookmarkEntity } from 'Models';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { deleteBookmark } from '../../actions/bookmarks';

type Props = {
  bookmark: BookmarkEntity;
};

export const BookmarkDetails = ({ bookmark }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(`/bookmarks/edit/${bookmark.id}`);
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteBookmark(bookmark.id, navigate));
  };

  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          Name: {bookmark.name}
        </Typography>
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          URL: <Link href={bookmark.url}>{bookmark.url}</Link>
        </Typography>
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          Favorite: {bookmark.favorite.toString()}
        </Typography>
      </Box>
      <ButtonGroup variant="outlined" size="small" aria-label="outlined primary button group" style={{ marginTop: 10 }}>
        <Button onClick={handleEditButtonClick} color="warning">
          Edit
        </Button>
        <Button onClick={handleDeleteButtonClick} color="error">
          Delete
        </Button>
      </ButtonGroup>
    </Paper>
  );
};
