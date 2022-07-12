import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { RegisterForm } from 'Components/Auth/RegisterForm';

export type RegisterFormState = {
  username: string;
  email: string;
  password: string;
  passwordConfirmed: string;
};

export const RegisterView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ViewHeading>Sign Up</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <RegisterForm />
      <Typography variant="body1" component="p" align="center" sx={{ marginTop: 4 }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </Typography>
    </>
  );
};
