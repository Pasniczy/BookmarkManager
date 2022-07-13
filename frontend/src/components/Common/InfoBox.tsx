import { ReactNode } from 'react';
import { Alert } from '@mui/material';

type Props = {
  children: ReactNode;
  severity: 'success' | 'warning' | 'error' | 'info';
};

export const InfoBox = ({ children, severity }: Props) => {
  return (
    <Alert severity={severity} variant="filled" elevation={6} sx={{ alignItems: 'center', marginTop: 3 }}>
      {children}
    </Alert>
  );
};
