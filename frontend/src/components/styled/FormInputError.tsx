import { Typography } from '@mui/material';

type Props = {
  children?: string;
};

export const FormInputError = ({ children }: Props) => {
  if (!children) return null;

  return (
    <Typography variant="body1" component="p" color="error" sx={{ marginTop: 1 }}>
      {children}
    </Typography>
  );
};
