import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

export const HomeView = () => {
  return (
    <>
      <Typography variant="h4" component="h2" align="center" color="primary" gutterBottom>
        Welcome to Bookmark Manager
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, asperiores deserunt, distinctio
        exercitationem fugiat hic iste itaque possimus quae repudiandae sapiente ut vel. Dolorum esse exercitationem in
        quaerat similique.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Link to="/login">
          <Button variant="contained" size="large">
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="contained" size="large">
            Sign Up
          </Button>
        </Link>
      </Stack>
    </>
  );
};
