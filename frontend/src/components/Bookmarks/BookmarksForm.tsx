import { NewBookmarkEntity } from 'Models';
import { ChangeEvent, FormEvent } from 'react';

type Props = {
  title: string;
  formState: NewBookmarkEntity;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const BookmarksForm = ({ title, formState, onInputChange, onSubmit }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <div className="group-form">
          <label htmlFor="#bookmark__name-input">
            <span>Name: </span>
            <input id="bookmark__name-input" type="text" name="name" value={formState.name} onChange={onInputChange} />
          </label>
        </div>
        <div className="group-form">
          <label htmlFor="#bookmark__url-input">
            <span>URL: </span>
            <input id="bookmark__url-input" type="text" name="url" value={formState.url} onChange={onInputChange} />
          </label>
        </div>
        <div className="group-form">
          <label htmlFor="#bookmark__favorite-input">
            <span>Favorite: </span>
            <input
              id="#bookmark__favorite-input"
              type="checkbox"
              name="favorite"
              checked={!!formState.favorite}
              onChange={onInputChange}
            />
          </label>
        </div>
        <button type="submit">{title}</button>
      </form>
    </div>
  );
};
