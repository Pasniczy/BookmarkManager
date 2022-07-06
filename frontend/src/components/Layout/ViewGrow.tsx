import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
};

export const ViewGrow = ({ children, justify }: Props) => {
  return <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: justify }}>{children}</Box>;
};
