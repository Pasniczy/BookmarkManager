import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const ViewGrow = ({ children }: Props) => {
  return <Box sx={{ flexGrow: 1 }}>{children}</Box>;
};
