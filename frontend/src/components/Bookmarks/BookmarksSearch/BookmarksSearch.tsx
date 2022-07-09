import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'Hooks/useDebounce';
import { getBookmarks } from 'Actions';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, InputBaseStyled } from './BookmarksSearch.styled';

export const BookmarksSearch = () => {
  const [searchedBookmark, setSearchedBookmark] = useState('');
  const dispatch = useDispatch();
  const debounced = useDebounce();

  useEffect(() => {
    debounced(() => dispatch(getBookmarks(searchedBookmark)), 500);
  }, [searchedBookmark, debounced, dispatch]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBaseStyled
        name="bookmarkSearch"
        type="text"
        placeholder="Search bookmarks..."
        onChange={(e) => setSearchedBookmark(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
