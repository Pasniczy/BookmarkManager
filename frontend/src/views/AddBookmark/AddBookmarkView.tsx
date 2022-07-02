import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewBookmarkEntity } from 'Models';
import Button from '@mui/material/Button';
import { addBookmark } from 'Actions';
import { useAppSelector } from 'Hooks';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { BoxStyled } from 'Components/styled/Box.styled';
import { BookmarksForm } from 'Components/Bookmarks/BookmarksForm';

export const AddBookmarkView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useAppSelector((state) => state.bookmarks);

  const [formState, setFormState] = useState<NewBookmarkEntity>({
    name: '',
    url: '',
    favorite: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState) {
      return console.error('Name and URL inputs cannot be empty');
    }
    dispatch(addBookmark(formState, navigate));
  };

  if (error) {
    return <p>Error occurred while adding bookmark</p>;
  }

  return (
    <>
      <ViewHeading>Add Bookmark</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <BookmarksForm formType="add" formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
    </>
  );
};
