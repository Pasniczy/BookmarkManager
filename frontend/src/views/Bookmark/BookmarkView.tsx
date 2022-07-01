import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store';
import { getBookmark } from '../../actions/bookmarks';
import { BookmarkDetails } from '../../components/Bookmarks/BookmarkDetails';
import { ViewHeading } from '../../components/ViewHeading/ViewHeading';
import { BoxStyled } from '../../components/styled/Box.styled';

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
