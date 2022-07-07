import { LoginUserRequestData } from 'Models';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from 'Actions';
import { Paper, FormControl, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import { FormInputError } from 'Components/styled/FormInputError';

// TODO: Add Redux login error UI indicator

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserRequestData>({
    resolver: yupResolver(loginSchema),
  });

  const submitForm: SubmitHandler<LoginUserRequestData> = (data) => dispatch(loginUser(data, navigate));

  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormGroupStyled>
          <FormControl>
            <TextField type="text" label="Email" variant="standard" {...register('email')} />
          </FormControl>
          {errors.email && <FormInputError>{errors.email.message}</FormInputError>}
        </FormGroupStyled>

        <FormGroupStyled>
          <FormControl>
            <TextField type="password" label="Password" variant="standard" {...register('password')} />
          </FormControl>
          {errors.password && <FormInputError>{errors.password.message}</FormInputError>}
        </FormGroupStyled>

        <Button type="submit" variant="contained" color="success" size="small">
          Login
        </Button>
      </form>
    </Paper>
  );
};
