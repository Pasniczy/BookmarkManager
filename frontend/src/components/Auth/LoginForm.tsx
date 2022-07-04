import { ChangeEvent, FormEvent } from 'react';
import { LoginFormState } from 'Views/LoginView/LoginView';
import { Paper, FormControl, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';

type Props = {
  formState: LoginFormState;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const LoginForm = ({ formState, onInputChange, onSubmit }: Props) => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={onSubmit}>
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
        <Button type="submit" variant="contained" color="success" size="small">
          Login
        </Button>
      </form>
    </Paper>
  );
};
