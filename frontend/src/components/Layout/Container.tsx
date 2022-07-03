import { Outlet } from 'react-router-dom';
import { Container as MUContainer } from '@mui/material';

export const Container = () => {
  return (
    <MUContainer maxWidth="lg">
      <Outlet />
    </MUContainer>
  );
};
