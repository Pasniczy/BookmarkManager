import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewBookmarkEntity } from 'Models';
import { addBookmark } from '../../actions/bookmarks';
import { useAppSelector } from '../../store';
import { BookmarksForm } from '../../components/Bookmarks/BookmarksForm';
import { ViewHeading } from '../../components/ViewHeading/ViewHeading';

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
      <BookmarksForm formType="add" formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
    </>
  );
};
