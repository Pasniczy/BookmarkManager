import MUContainer from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

export const Container = () => {
  return (
    <MUContainer maxWidth="lg">
      <Outlet />
    </MUContainer>
  );
};
