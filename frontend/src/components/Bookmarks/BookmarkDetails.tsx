import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BookmarkEntity } from 'Models';
import { deleteBookmark } from 'Actions';
import { Button, Link, Typography } from '@mui/material';
import { CustomPaper } from 'Components/Common/CustomPaper';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { StyledButtonGroup } from 'Components/Common/CustomButtonGroup';

type Props = {
  bookmark: BookmarkEntity;
};

export const BookmarkDetails = ({ bookmark }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(`/bookmarks/edit/${bookmark.id}`);
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteBookmark(bookmark.id, navigate));
  };

  return (
    <CustomPaper>
      <BoxStyled>
        <Typography variant="body1" component="p">
          Name: {bookmark.name}
        </Typography>
      </BoxStyled>
      <BoxStyled>
        <Typography variant="body1" component="p">
          URL: <Link href={bookmark.url}>{bookmark.url}</Link>
        </Typography>
      </BoxStyled>
      <BoxStyled>
        <Typography variant="body1">Favorite: {bookmark.favorite.toString()}</Typography>
      </BoxStyled>
      <StyledButtonGroup>
        <Button onClick={handleEditButtonClick} color="warning">
          Edit
        </Button>
        <Button onClick={handleDeleteButtonClick} color="error">
          Delete
        </Button>
      </StyledButtonGroup>
    </CustomPaper>
  );
};
