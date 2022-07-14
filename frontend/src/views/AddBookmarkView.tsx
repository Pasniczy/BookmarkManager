import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ViewHeading } from 'Components/Common/ViewHeading';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { BookmarkForm } from 'Components/Bookmarks/BookmarkForm';

export const AddBookmarkView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ViewHeading>Add Bookmark</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <BookmarkForm formType="add" />
    </>
  );
};
