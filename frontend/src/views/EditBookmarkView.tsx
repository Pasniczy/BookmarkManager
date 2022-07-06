import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewBookmarkData } from 'Models';
import { useAppSelector } from 'Hooks';
import { editBookmark, getBookmark } from 'Actions';
import { Button } from '@mui/material';
import { BookmarksForm } from 'Components/Bookmarks/BookmarksForm';
import { BoxStyled } from 'Components/styled/Box.styled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';

export const EditBookmarkView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id as string;
  const { bookmark, error } = useAppSelector((state) => state.bookmarks);

  const [formState, setFormState] = useState<NewBookmarkData>({
    name: '',
    url: '',
    favorite: false,
  });

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bookmark) {
      const { name, url, favorite } = bookmark;
      setFormState({ name, url, favorite });
    }
  }, [bookmark]);

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
    dispatch(editBookmark(id, formState, navigate));
  };

  if (error) {
    return <p>Error occurred while adding bookmark</p>;
  }

  return (
    <>
      <ViewHeading>Edit bookmark</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <BookmarksForm formType="edit" formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
    </>
  );
};
