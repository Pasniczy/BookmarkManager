import { ReactNode } from 'react';
import { Alert } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const Error = ({ children }: Props) => {
  return (
    <Alert variant="filled" severity="error" elevation={6} sx={{ marginTop: 3 }}>
      {children}
    </Alert>
  );
};
