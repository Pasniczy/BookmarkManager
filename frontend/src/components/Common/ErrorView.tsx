import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { InfoBox } from 'Components/Common/InfoBox';

type Props = {
  children: ReactNode;
};

export const ErrorView = ({ children }: Props) => {
  return (
    <>
      <BoxStyled>
        <InfoBox severity="error">
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Unexpected Error Occurred
          </Typography>
          {children}
        </InfoBox>
      </BoxStyled>
      <BoxStyled>
        <Link to="/">
          <Button variant="contained" color="primary" size="small">
            Go to Home Page
          </Button>
        </Link>
      </BoxStyled>
    </>
  );
};
