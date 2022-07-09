import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'Hooks/useDebounce';
import { getBookmarks } from 'Actions';

export const BookmarksSearch = () => {
  const [searchedBookmark, setSearchedBookmark] = useState('');
  const dispatch = useDispatch();
  const debounced = useDebounce();

  useEffect(() => {
    debounced(() => dispatch(getBookmarks(searchedBookmark)), 500);
  }, [searchedBookmark, debounced, dispatch]);

  return (
    <div>
      <input name="bookmarkSearch" type="text" onChange={(e) => setSearchedBookmark(e.target.value)} />
    </div>
  );
};
