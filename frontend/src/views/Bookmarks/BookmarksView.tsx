import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
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
    <>
      <Box style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography variant="h4" component="h2">
          Bookmarks
        </Typography>
      </Box>
      <Box style={{ marginBottom: 20 }}>
        <Link to="/bookmarks/add">
          <Button variant="contained" color="success" size="small" endIcon={<AddIcon />}>
            Add Bookmark
          </Button>
        </Link>
      </Box>
      <Stack spacing={4}>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </Stack>
    </>
  );
};
