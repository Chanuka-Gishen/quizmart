import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { FormikProvider } from 'formik';
import { PasswordField } from 'components/PasswordField';
import { LoadingButton } from '@mui/lab';

export const PasswordView = (props) => {
  const { formik, isLoading } = props;
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Grid item xl={6} xs={6}>
      <Stack spacing={2} direction={'column'}>
        <Typography variant="body1">Change Password</Typography>
        <FormikProvider value={formik}>
          <PasswordField
            label="Old Password"
            variant="outlined"
            {...getFieldProps('oldPassword')}
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />
          <PasswordField
            label="New Password"
            variant="outlined"
            {...getFieldProps('newPassword')}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <PasswordField
            label="Confirm New Password"
            variant="outlined"
            {...getFieldProps('confirmPassword')}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <LoadingButton
            fullWidth
            variant="outlined"
            type="submit"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </FormikProvider>
      </Stack>
    </Grid>
  );
};
