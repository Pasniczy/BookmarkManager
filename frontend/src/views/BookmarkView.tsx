import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'Hooks/useAppSelector';
import { getBookmark } from 'Actions';
import { Button } from '@mui/material';
import { BookmarkDetails } from 'Components/Bookmarks/BookmarkDetails';
import { BookmarkDetailsSkeleton } from 'Components/Bookmarks/BookmarkDetailsSkeleton';
import { ViewHeading } from 'Components/Common/ViewHeading';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { ErrorView } from 'Components/Common/ErrorView';

export const BookmarkView = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const { bookmark, loading, error } = useAppSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  if (error) return <ErrorView>Error occurred while loading bookmark</ErrorView>;

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
      {loading || !bookmark ? <BookmarkDetailsSkeleton /> : <BookmarkDetails bookmark={bookmark} />}
    </>
  );
};
