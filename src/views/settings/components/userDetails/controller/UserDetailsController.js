import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserDetailsView } from '../view/UserDetailsView';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import { BACKEND_API } from 'axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import authAction from 'store/action/authAction';

const UserDetailsController = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const sourceToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);
  const [editOn, setEditOn] = useState(false);

  const currentName = useSelector((state) => state.auth.admin.name);

  const changeNameSchema = Yup.object().shape({
    newUserName: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      newUserName: currentName
    },
    validationSchema: changeNameSchema,
    onSubmit: async () => {
      await handleSubmit();
    }
  });

  const changeEditMode = () => {
    setEditOn(!editOn);
  };

  const handleSubmit = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.CHANGE_USR_NAME,
        method: 'PUT',
        cancelToken: sourceToken.token,
        data: formik.values
      })
        .then((res) => {
          const data = res.data;

          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.detectSnackbarAlertVariant(data.responseCode)
          });
          formik.resetForm();

          if (responseUtil.responseIsSuccess(data.responseCode)) {
            dispatch(authAction.loginUser(data));
          }
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <UserDetailsView
      formik={formik}
      isLoading={isLoading}
      editOn={editOn}
      changeEditMode={changeEditMode}
    />
  );
};

export default UserDetailsController;
