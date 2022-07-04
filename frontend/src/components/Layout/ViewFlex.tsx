import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const ViewFlex = ({ children }: Props) => {
  return <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>{children}</Box>;
};