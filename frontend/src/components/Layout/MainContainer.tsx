import { Outlet } from 'react-router-dom';
import { Container as MUContainer } from '@mui/material';
import { Header } from 'Components/Layout/Header/Header';

type Props = {
  center?: boolean;
};

export const MainContainer = ({ center = false }: Props) => {
  return (
    <>
      <Header />
      <MUContainer
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: center ? 'center' : 'flex-start',
        }}
      >
        <Outlet />
      </MUContainer>
    </>
  );
};
