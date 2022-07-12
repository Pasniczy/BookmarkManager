import { useDispatch } from 'react-redux';
import { AlertType } from 'ActionTypes';
import { Alert } from '@mui/material';
import { clearAlert } from 'Actions';

type Props = {
  message: string;
  type: AlertType;
};

export const CustomAlert = ({ type, message }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(clearAlert());

  return (
    <Alert
      onClick={handleClick}
      variant="filled"
      severity={type}
      sx={{
        position: 'absolute',
        top: '6vh',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.8,
        cursor: 'pointer',
      }}
    >
      {message}
    </Alert>
  );
};
