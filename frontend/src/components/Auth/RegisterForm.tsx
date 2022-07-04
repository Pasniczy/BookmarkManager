import { ChangeEvent, FormEvent } from 'react';
import { RegisterFormState } from 'Views/RegisterView/RegisterView';
import { Paper, FormControl, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';

type Props = {
  formState: RegisterFormState;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const RegisterForm = ({ formState, onInputChange, onSubmit }: Props) => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={onSubmit}>
        <FormGroupStyled>
          <FormControl>
            <TextField
              name="username"
              label="Name"
              variant="standard"
              value={formState.username}
              onChange={onInputChange}
            />
          </FormControl>
        </FormGroupStyled>
        <FormGroupStyled>
          <FormControl>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="standard"
              value={formState.email}
              onChange={onInputChange}
            />
          </FormControl>
        </FormGroupStyled>
        <FormGroupStyled>
          <FormControl>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="standard"
              value={formState.password}
              onChange={onInputChange}
            />
          </FormControl>
        </FormGroupStyled>
        <FormGroupStyled>
          <FormControl>
            <TextField
              type="password"
              name="passwordConfirmed"
              label="Confirm Password"
              variant="standard"
              value={formState.passwordConfirmed}
              onChange={onInputChange}
            />
          </FormControl>
        </FormGroupStyled>
        <Button type="submit" variant="contained" color="success" size="small">
          Register
        </Button>
      </form>
    </Paper>
  );
};
