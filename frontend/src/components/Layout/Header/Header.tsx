import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from './Header.styled';

type Props = {
  isHomePage?: boolean;
};

export const Header = ({ isHomePage }: Props) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link to="/" style={{ color: '#fff' }}>
              Bookmarks Manager
            </Link>
          </Typography>
          {!isHomePage && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
