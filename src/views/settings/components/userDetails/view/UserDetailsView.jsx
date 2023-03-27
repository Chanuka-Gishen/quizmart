import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography, Grid, Button } from '@mui/material';
import { FormikProvider } from 'formik';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

export const UserDetailsView = (props) => {
  const { formik, isLoading, editOn, changeEditMode } = props;
  const { errors, touched, getFieldProps, handleSubmit } = formik;

  return (
    <Grid item xl={6} sm={6}>
      <Stack spacing={2} direction={'column'}>
        <Typography variant={'subheading'}>Change User Name</Typography>
        <Stack alignItems={'start'}>
          <Button
            variant="contained"
            endIcon={editOn ? <EditOffIcon /> : <EditIcon />}
            onClick={changeEditMode}
          >
            Edit {editOn ? 'Off' : 'On'}
          </Button>
        </Stack>
        <FormikProvider value={formik}>
          <TextField
            label={'User Name'}
            variant={'outlined'}
            disabled={!editOn}
            {...getFieldProps('newUserName')}
            error={Boolean(touched.newUserName && errors.newUserName)}
            helperText={touched.newUserName && errors.newUserName}
          />
          <LoadingButton
            variant="outlined"
            loading={isLoading}
            onClick={handleSubmit}
            //disabled={!editOn}
            disabled={true}
          >
            Submit
          </LoadingButton>
        </FormikProvider>
      </Stack>
    </Grid>
  );
};
