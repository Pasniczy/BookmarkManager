import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from './Header.styled';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <NavLink to="/bookmarks">Bookmarks Manager</NavLink>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
