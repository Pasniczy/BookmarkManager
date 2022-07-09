import { alpha, styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
}));

export const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
