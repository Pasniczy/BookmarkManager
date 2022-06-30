import { NewBookmarkEntity } from 'Models';
import { ChangeEvent, FormEvent } from 'react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <FormGroup style={{ marginBottom: 16 }}>
          <FormControl>
            <TextField name="name" label="Name" variant="standard" value={formState.name} onChange={onInputChange} />
          </FormControl>
        </FormGroup>
        <FormGroup style={{ marginBottom: 16 }}>
          <FormControl>
            <TextField name="url" label="URL" variant="standard" value={formState.url} onChange={onInputChange} />
          </FormControl>
        </FormGroup>
        <FormGroup style={{ marginBottom: 16 }}>
          <FormControl>
            <FormLabel>
              Favorite:
              <Switch color="warning" name="favorite" checked={Boolean(formState.favorite)} onChange={onInputChange} />
            </FormLabel>
          </FormControl>
        </FormGroup>
        <Button type="submit" variant="contained" color="success" size="small">
          {formType}
        </Button>
      </form>
    </Paper>
  );
};
