import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const BoxGrowStyled = ({ children }: Props) => {
  return <Box sx={{ marginBottom: 2, flexGrow: 1, backgroundColor: 'yellow' }}>{children}</Box>;
};
