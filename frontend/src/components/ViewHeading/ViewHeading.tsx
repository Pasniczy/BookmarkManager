import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { BoxStyled } from '../styled/Box.styled';

type Props = {
  children: ReactNode;
};

export const ViewHeading = ({ children }: Props) => {
  return (
    <BoxStyled>
      <Typography variant="h4" component="h2">
        {children}
      </Typography>
    </BoxStyled>
  );
};
