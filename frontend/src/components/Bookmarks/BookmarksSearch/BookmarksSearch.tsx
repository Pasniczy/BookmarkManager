import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBooleanState } from 'Hooks/useBooleanState';
import { useDebounce } from 'Hooks/useDebounce';
import { getBookmarks } from 'Actions';
import { Search as SearchIcon } from '@mui/icons-material';
import { FormLabel, Switch, Box } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import { Search, SearchIconWrapper, InputBaseStyled } from './BookmarksSearch.styled';

export const BookmarksSearch = () => {
  const [searchedBookmark, setSearchedBookmark] = useState('');
  const [shouldSearchFavorites, { toggle }] = useBooleanState(false);
  const dispatch = useDispatch();
  const debounced = useDebounce();

  useEffect(() => {
    debounced(() => dispatch(getBookmarks(searchedBookmark, shouldSearchFavorites)), 500);
  }, [searchedBookmark, shouldSearchFavorites, debounced, dispatch]);

  return (
    <Box>
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

      <FormGroupStyled>
        <FormLabel>
          Show favorites:
          <Switch name="shouldSearchFavorites" onChange={toggle} checked={shouldSearchFavorites} color="warning" />
        </FormLabel>
      </FormGroupStyled>
    </Box>
  );
};
