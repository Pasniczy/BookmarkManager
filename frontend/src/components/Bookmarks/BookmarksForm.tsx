import { NewBookmarkEntity } from 'Models';
import { ChangeEvent, FormEvent } from 'react';
import { Paper, FormControl, FormLabel, Switch, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';

type Props = {
  formType: string;
  formState: NewBookmarkEntity;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const BookmarksForm = ({ formType, formState, onInputChange, onSubmit }: Props) => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={onSubmit}>
        <FormGroupStyled>
          <FormControl>
            <TextField name="name" label="Name" variant="standard" value={formState.name} onChange={onInputChange} />
          </FormControl>
        </FormGroupStyled>
        <FormGroupStyled>
          <FormControl>
            <TextField name="url" label="URL" variant="standard" value={formState.url} onChange={onInputChange} />
          </FormControl>
        </FormGroupStyled>
        <FormGroupStyled>
          <FormControl>
            <FormLabel>
              Favorite:
              <Switch color="warning" name="favorite" checked={Boolean(formState.favorite)} onChange={onInputChange} />
            </FormLabel>
          </FormControl>
        </FormGroupStyled>
        <Button type="submit" variant="contained" color="success" size="small">
          {formType}
        </Button>
      </form>
    </Paper>
  );
};
