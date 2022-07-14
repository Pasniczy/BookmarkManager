import { useAppSelector } from 'Hooks/useAppSelector';
import { Typography } from '@mui/material';
import { ViewHeading } from 'Components/Common/ViewHeading';
import { BoxStyled } from 'Components/Common/BoxStyled';

export const AccountView = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <p>Error occurred</p>;
  }

  return (
    <>
      <ViewHeading>Account</ViewHeading>
      <BoxStyled>
        <Typography>Name: {user.username}</Typography>
        <Typography>Email: {user.email}</Typography>
      </BoxStyled>
    </>
  );
};
