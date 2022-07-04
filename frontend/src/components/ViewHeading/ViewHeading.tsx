import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { BoxStyled } from 'Components/styled/Box.styled';

type Props = {
  children: ReactNode;
};

export const ViewHeading = ({ children }: Props) => {
  return (
    <BoxStyled>
      <Typography variant="h4" component="h2" sx={{ marginTop: 2 }}>
        {children}
      </Typography>
    </BoxStyled>
  );
};
