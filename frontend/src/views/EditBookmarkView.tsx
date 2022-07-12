import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBookmark } from 'Actions';
import { useAppSelector } from 'Hooks/useAppSelector';
import { Button } from '@mui/material';
import { BookmarkForm } from 'Components/Bookmarks/BookmarkForm';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { Spinner } from 'Components/Common/Spinner';

export const EditBookmarkView = () => {
  const { bookmark, loading } = useAppSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  return (
    <>
      <ViewHeading>Edit bookmark</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      {loading || !bookmark ? <Spinner /> : <BookmarkForm formType="edit" id={id} defaultValues={bookmark} />}
    </>
  );
};
