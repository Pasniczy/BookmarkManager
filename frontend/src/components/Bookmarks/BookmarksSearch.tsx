import { useEffect, useState } from 'react';
import { useDebounce } from 'Hooks/useDebounce';

export const BookmarksSearch = () => {
  const [searchedBookmark, setSearchedBookmark] = useState('');
  const debounced = useDebounce();

  useEffect(() => {
    debounced(() => console.log(searchedBookmark), 500);
  }, [searchedBookmark, debounced]);

  return (
    <div>
      <input name="bookmarkSearch" type="text" onChange={(e) => setSearchedBookmark(e.target.value)} />
    </div>
  );
};
