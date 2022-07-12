import { ReactNode } from 'react';
import { FormGroup } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const CustomFormGroup = ({ children }: Props) => {
  return <FormGroup style={{ marginBottom: 16 }}>{children}</FormGroup>;
};
