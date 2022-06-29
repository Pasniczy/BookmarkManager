import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewBookmarkEntity } from 'Models';
import { addBookmark } from '../../actions/bookmarks';
import { useAppSelector } from '../../store';

export const AddBookmarkView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useAppSelector((state) => state.bookmarks);

  const [formState, setFormState] = useState<NewBookmarkEntity>({
    name: '',
    url: '',
    favorite: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState) {
      return console.error('Name and URL inputs cannot be empty');
    }
    dispatch(addBookmark(formState, navigate));
  };

  if (loading) {
    return <p>Adding bookmark</p>;
  }

  if (error) {
    return <p>Error occurred while adding bookmark</p>;
  }

  return (
    <div>
      <h2>Add Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div className="group-form">
          <label htmlFor="#AddBookmark__name-input">
            <span>Name: </span>
            <input
              id="AddBookmark__name-input"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="group-form">
          <label htmlFor="#AddBookmark__url-input">
            <span>URL: </span>
            <input
              id="AddBookmark__url-input"
              type="text"
              name="url"
              value={formState.url}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="group-form">
          <label htmlFor="#AddBookmark__favorite-input">
            <span>Favorite: </span>
            <input
              id="#AddBookmark__favorite-input"
              type="checkbox"
              name="favorite"
              checked={!!formState.favorite}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <button type="submit">Add bookmark</button>
      </form>
    </div>
  );
};
