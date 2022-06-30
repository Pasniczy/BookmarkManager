import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../store';
import { getBookmark } from '../../actions/bookmarks';
import { BookmarkDetails } from '../../components/Bookmarks/BookmarkDetails';

export const BookmarkView = () => {
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
    <>
      <Box style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography variant="h4" component="h2">
          Details
        </Typography>
      </Box>
      <Box style={{ marginBottom: 20 }}>
        <Link to="/bookmarks">
          <Button variant="contained" color="primary" size="small">
            Go back
          </Button>
        </Link>
      </Box>
      <BookmarkDetails bookmark={bookmark} />
    </>
  );
};
