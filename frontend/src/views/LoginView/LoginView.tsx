import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUserRequestData } from 'Models';
import { loginUser } from 'Actions';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/styled/Box.styled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { LoginForm } from 'Components/Auth/LoginForm';

export const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<LoginUserRequestData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle validation
    if (!formState.email || !formState.password) {
      return console.error('User email and password inputs cannot be empty');
    }
    if (formState.password.length < 6) {
      return console.error('User password must be at least 6 characters');
    }
    dispatch(loginUser(formState, navigate));
  };

  return (
    <>
      <ViewHeading>Sign In</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <LoginForm formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
      <Typography variant="body1" component="p" align="center" sx={{ marginTop: 4 }}>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </>
  );
};
