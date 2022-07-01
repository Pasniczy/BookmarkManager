import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../store';
import { getBookmarks } from '../../actions/bookmarks';
import { BookmarkItem } from '../../components/Bookmarks/BookmarkItem';
import { ViewHeading } from '../../components/ViewHeading/ViewHeading';
import { BoxStyled } from '../../components/styled/Box.styled';

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
      <ViewHeading>Bookmarks</ViewHeading>
      <BoxStyled>
        <Link to="/bookmarks/add">
          <Button variant="contained" color="success" size="small" endIcon={<AddIcon />}>
            Add Bookmark
          </Button>
        </Link>
      </BoxStyled>
      <Stack spacing={4}>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </Stack>
    </>
  );
};
