import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const AppContainer = ({ children }: Props) => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>{children}</Box>
  );
};
