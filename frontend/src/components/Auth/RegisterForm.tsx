import { Paper, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NewUserEntity } from 'Models';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormState } from 'Views/RegisterView';
import { registerUser } from 'Actions';
import { FormInputError } from 'Components/styled/FormInputError';

// TODO: Add Redux register error UI indicator

const registerSchema = yup.object().shape({
  username: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  passwordConfirmed: yup.string().oneOf([yup.ref('password')], 'Passwords do not match.'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<RegisterFormState>({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', passwordConfirmed: '' },
  });

  const submitForm: SubmitHandler<RegisterFormState> = (data) => {
    const newUserEntity: NewUserEntity = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(newUserEntity, navigate));
  };

  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="text"
                label="Name"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="email"
                label="Email"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="password"
                label="Password"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Controller
          control={control}
          name="passwordConfirmed"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="password"
                label="Confirm Password"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Button type="submit" variant="contained" color="success" size="small">
          Register
        </Button>
      </form>
    </Paper>
  );
};
