import { ReactNode } from 'react';
import { ButtonGroup } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const StyledButtonGroup = ({ children }: Props) => {
  return (
    <ButtonGroup variant="outlined" size="small" aria-label="button group" sx={{ marginTop: 2 }}>
      {children}
    </ButtonGroup>
  );
};
