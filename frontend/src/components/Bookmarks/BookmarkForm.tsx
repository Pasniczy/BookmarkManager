import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewBookmarkData } from 'Models';
import { addBookmark, editBookmark } from 'Actions';
import { Paper, FormLabel, Switch, TextField, Button } from '@mui/material';
import { FormGroupStyled } from 'Components/styled/FormGroup.styled';
import { FormInputError } from 'Components/styled/FormInputError';

// TODO: Add Redux bookmark error UI indicator

type AddBookmarkProps = {
  formType: 'add';
};

type EditBookmarkProps = {
  formType: 'edit';
  id: string;
  defaultValues: NewBookmarkData;
};

type Props = AddBookmarkProps | EditBookmarkProps;

const bookmarkSchema = yup.object().shape({
  name: yup.string().required('Bookmark name is required'),
  url: yup.string().url('Invalid url').required('Url is required'),
  favorite: yup.boolean().required('Favorite value is required'),
});

export const BookmarkForm = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues: NewBookmarkData =
    props.formType === 'edit' ? props.defaultValues : { name: '', url: '', favorite: false };

  const { control, handleSubmit } = useForm<NewBookmarkData>({
    resolver: yupResolver(bookmarkSchema),
    defaultValues,
  });

  const submitForm: SubmitHandler<NewBookmarkData> = (data) => {
    console.log(data);
    return props.formType === 'edit'
      ? dispatch(editBookmark(props.id, data, navigate))
      : dispatch(addBookmark(data, navigate));
  };

  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="text"
                label="Name"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Controller
          control={control}
          name="url"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                type="text"
                label="url"
                variant="standard"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Controller
          control={control}
          name="favorite"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormGroupStyled>
              <FormLabel>Favorite:</FormLabel>
              <Switch
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                checked={Boolean(value)}
                inputRef={ref}
                color="warning"
              />
              {error && <FormInputError>{error.message}</FormInputError>}
            </FormGroupStyled>
          )}
        />

        <Button type="submit" variant="contained" color="success" size="small">
          {props.formType}
        </Button>
      </form>
    </Paper>
  );
};
