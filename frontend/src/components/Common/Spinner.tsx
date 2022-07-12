import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
    <CircularProgress />
  </Box>
);
