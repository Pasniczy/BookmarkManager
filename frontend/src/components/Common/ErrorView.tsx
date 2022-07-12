import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { Error } from 'Components/Common/Error';

type Props = {
  children: ReactNode;
};

export const ErrorView = ({ children }: Props) => {
  return (
    <>
      <BoxStyled>
        <Error>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Unexpected Error Occurred
          </Typography>
          {children}
        </Error>
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
