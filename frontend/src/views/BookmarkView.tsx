import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'Hooks/useAppSelector';
import { getBookmark } from 'Actions';
import { Button } from '@mui/material';
import { BookmarkDetails } from 'Components/Bookmarks/BookmarkDetails';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { BoxStyled } from 'Components/styled/Box.styled';

export const BookmarkView = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const { bookmark, error } = useAppSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  // TODO: Handle loading
  // if (loading) {
  //   return <p>Loading bookmark with id: {id}...</p>;
  // }

  if (error || !bookmark) {
    return <p>Error occurred while loading bookmark</p>;
  }

  return (
    <>
      <ViewHeading>Bookmark Details</ViewHeading>
      <BoxStyled>
        <Link to="/bookmarks">
          <Button variant="contained" color="primary" size="small">
            Go back
          </Button>
        </Link>
      </BoxStyled>
      <BookmarkDetails bookmark={bookmark} />
    </>
  );
};
