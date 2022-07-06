import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from 'Hooks';
import { Button } from '@mui/material';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';

export const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? (
    <Outlet />
  ) : (
    <>
      <ViewHeading>User unauthorized</ViewHeading>
      <Link to="/">
        <Button variant="contained" size="medium">
          Go back to homepage
        </Button>
      </Link>
    </>
  );
};
