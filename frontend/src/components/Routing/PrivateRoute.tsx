import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from 'Hooks/useAppSelector';
import { Button } from '@mui/material';
import { ViewHeading } from 'Components/Common/ViewHeading';

export const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <>
        <ViewHeading>User unauthorized</ViewHeading>
        <Link to="/">
          <Button variant="contained" size="medium">
            Go back to homepage
          </Button>
        </Link>
      </>
    );
  }

  return <Outlet />;
};
