import { Link } from 'react-router-dom';
import { AppBar, Container, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <AppBar position="static" sx={{ alignSelf: 'flex-end' }}>
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1, paddingBottom: 1 }}
      >
        <Typography>Copyright &#169; 2022 Bartosz Paśnik</Typography>
        <Link to="cookies">
          <Typography sx={{ color: 'white' }}>Cookies Policy</Typography>
        </Link>
      </Container>
    </AppBar>
  );
};
