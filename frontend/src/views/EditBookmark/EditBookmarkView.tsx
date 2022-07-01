import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewBookmarkEntity } from 'Models';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store';
import { editBookmark, getBookmark } from '../../actions/bookmarks';
import { BookmarksForm } from '../../components/Bookmarks/BookmarksForm';
import { BoxStyled } from '../../components/styled/Box.styled';
import { ViewHeading } from '../../components/ViewHeading/ViewHeading';

export const EditBookmarkView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  // TODO: Add routes types
  const id = params.id as string;
  const { bookmark, error } = useAppSelector((state) => state.bookmarks);

  const [formState, setFormState] = useState<NewBookmarkEntity>({
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
        <Link to="/bookmarks">
          <Button type="button" variant="contained" color="primary" size="small">
            Go back
          </Button>
        </Link>
      </BoxStyled>
      <BookmarksForm formType="edit" formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
    </>
  );
};
