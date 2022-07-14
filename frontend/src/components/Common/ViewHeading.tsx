import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';

type Props = {
  children: ReactNode;
};

export const ViewHeading = ({ children }: Props) => {
  return (
    <BoxStyled>
      <Typography variant="h4" component="h2" color="primary" sx={{ marginTop: 2 }}>
        {children}
      </Typography>
    </BoxStyled>
  );
};
