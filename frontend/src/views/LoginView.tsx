import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { ViewHeading } from 'Components/Common/ViewHeading';
import { LoginForm } from 'Components/Auth/LoginForm';

export const LoginView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ViewHeading>Sign In</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <LoginForm />
      <Typography variant="body1" component="p" align="center" sx={{ marginTop: 4 }}>
        Don't have an account? <Link to="/register">Sign Up</Link>.
      </Typography>
    </>
  );
};
