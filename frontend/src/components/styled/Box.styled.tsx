import { ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const BoxStyled = ({ children }: Props) => {
  return <Box style={{ marginBottom: 10 }}>{children}</Box>;
};
