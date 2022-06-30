import { BookmarkEntity } from 'Models';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

type Props = {
  bookmark: BookmarkEntity;
};

export const BookmarkDetails = ({ bookmark }: Props) => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          Name: {bookmark.name}
        </Typography>
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          URL: <Link href={bookmark.url}>{bookmark.url}</Link>
        </Typography>
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Typography variant="body1" component="p">
          Favorite: {bookmark.favorite.toString()}
        </Typography>
      </Box>
    </Paper>
  );
};
