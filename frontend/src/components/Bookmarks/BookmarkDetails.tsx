import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BookmarkEntity } from 'Models';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { deleteBookmark } from 'Actions';
import { PaperStyled } from 'Components/styled/Paper.styled';
import { BoxStyled } from 'Components/styled/Box.styled';
import { StyledButtonGroup } from 'Components/styled/ButtonGroup.styled';

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
    <PaperStyled>
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
    </PaperStyled>
  );
};
