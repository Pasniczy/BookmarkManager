import { Paper, FormControl, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormState>({
    resolver: yupResolver(registerSchema),
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
        <FormGroupStyled>
          <FormControl>
            <TextField type="text" label="Name" variant="standard" {...register('username')} />
          </FormControl>
          {errors.username && <FormInputError>{errors.username.message}</FormInputError>}
        </FormGroupStyled>

        <FormGroupStyled>
          <FormControl>
            <TextField type="email" label="Email" variant="standard" {...register('email')} />
          </FormControl>
          {errors.email && <FormInputError>{errors.email.message}</FormInputError>}
        </FormGroupStyled>

        <FormGroupStyled>
          <FormControl>
            <TextField type="password" label="Password" variant="standard" {...register('password')} />
          </FormControl>
          {errors.password && <FormInputError>{errors.password.message}</FormInputError>}
        </FormGroupStyled>

        <FormGroupStyled>
          <FormControl>
            <TextField type="password" label="Confirm Password" variant="standard" {...register('passwordConfirmed')} />
          </FormControl>
          {errors.passwordConfirmed && <FormInputError>{errors.passwordConfirmed.message}</FormInputError>}
        </FormGroupStyled>

        <Button type="submit" variant="contained" color="success" size="small">
          Register
        </Button>
      </form>
    </Paper>
  );
};
