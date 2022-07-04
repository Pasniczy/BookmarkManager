import { Outlet, useLocation } from 'react-router-dom';
import { Container as MUContainer } from '@mui/material';
import { Header } from 'Components/Layout/Header/Header';

type Props = {
  center?: boolean;
};

export const MainContainer = ({ center = false }: Props) => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header isHomePage={isHomePage} />
      <MUContainer
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: center ? 'center' : 'flex-start',
          paddingTop: isHomePage ? 0 : 3,
        }}
      >
        <Outlet />
      </MUContainer>
    </>
  );
};
