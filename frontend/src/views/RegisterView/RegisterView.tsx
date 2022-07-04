import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/styled/Box.styled';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { RegisterForm } from 'Components/Auth/RegisterForm';

export type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirmed: string;
};

export const RegisterView = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmed: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle validation
    if (!formState.name || !formState.email || !formState.password || !formState.passwordConfirmed) {
      return console.error('User name, email and passwords inputs cannot be empty');
    }
    if (formState.password.length < 6) {
      return console.error('User password must be at least 6 characters');
    }
    if (formState.password !== formState.passwordConfirmed) {
      return console.error('Password do not match');
    }
  };

  return (
    <>
      <ViewHeading>Sign Up</ViewHeading>
      <BoxStyled>
        <Button type="button" variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </BoxStyled>
      <RegisterForm formState={formState} onInputChange={handleInputChange} onSubmit={handleSubmit} />
      <Typography variant="body1" component="p" align="center" sx={{ marginTop: 4 }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </Typography>
    </>
  );
};
