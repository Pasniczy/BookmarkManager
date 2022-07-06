import { ReactNode } from 'react';
import { Container as MUContainer } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const MainContainer = ({ children }: Props) => {
  return (
    <MUContainer
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </MUContainer>
  );
};
