import { useAppSelector } from 'Hooks';
import { Typography } from '@mui/material';
import { ViewHeading } from 'Components/ViewHeading/ViewHeading';
import { BoxStyled } from 'Components/styled/Box.styled';

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
