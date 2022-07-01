import { ReactNode } from 'react';
import Paper from '@mui/material/Paper';

type Props = {
  children: ReactNode;
};

export const PaperStyled = ({ children }: Props) => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      {children}
    </Paper>
  );
};
