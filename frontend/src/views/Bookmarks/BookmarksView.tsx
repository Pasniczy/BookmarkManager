import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'Hooks';
import { getBookmarks } from 'Actions';
import { Stack, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BookmarkItem } from 'Components/Bookmarks/BookmarkItem';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { BoxStyled } from 'Components/styled/Box.styled';

export const BookmarksView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  const { bookmarks, error } = useAppSelector((state) => state.bookmarks);

  // TODO: Handle loading
  // if (loading) {
  //   return <p>Loading bookmarks...</p>;
  // }

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
