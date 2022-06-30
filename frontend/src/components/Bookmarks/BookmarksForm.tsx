import { NewBookmarkEntity } from 'Models';
import { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
  title: string;
  formState: NewBookmarkEntity;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const BookmarksForm = ({ title, formState, onInputChange, onSubmit }: Props) => {
  return (
    <>
      <Box style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Box>
      <Box style={{ marginTop: 10, marginBottom: 10 }}>
        <Link to="/bookmarks">
          <Button type="button" variant="contained" color="primary" size="small">
            Go back
          </Button>
        </Link>
      </Box>
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
          {title}
        </Button>
      </form>
    </>
  );
};
