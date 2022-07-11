import { LoginUserRequestData } from 'Models';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from 'Actions';
import { Paper, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import { FormInputError } from 'Components/styled/FormInputError';
import { Error } from 'Components/styled/Error.styled';
import { useAppSelector } from 'Hooks/useAppSelector';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = useAppSelector((state) => state.auth);
  const { control, handleSubmit } = useForm<LoginUserRequestData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submitForm: SubmitHandler<LoginUserRequestData> = (data) => dispatch(loginUser(data, navigate));

  return (
    <>
      <Paper style={{ padding: 20 }} elevation={6}>
        <form onSubmit={handleSubmit(submitForm)}>
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

          <Button type="submit" variant="contained" color="success" size="small">
            Login
          </Button>
        </form>
      </Paper>

      {errors.login && <Error>{errors.login}</Error>}
    </>
  );
};
