import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBookmark } from 'Actions';
import { useAppSelector } from 'Hooks/useAppSelector';
import { Button } from '@mui/material';
import { BookmarkForm } from 'Components/Bookmarks/BookmarkForm';
import { BoxStyled } from 'Components/styled/Box.styled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';

export const EditBookmarkView = () => {
  const bookmark = useAppSelector((state) => state.bookmarks.bookmark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  // TODO: Handle loading
  if (!bookmark) return <p>Loading...</p>;

  return (
    <>
      <ViewHeading>Edit bookmark</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <BookmarkForm formType="edit" id={id} defaultValues={bookmark} />
    </>
  );
};
