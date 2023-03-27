import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PasswordView } from '../view/PasswordView';
import axios from 'axios';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import { BACKEND_API } from 'axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import authAction from 'store/action/authAction';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';

const PasswordController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const sourceToken = axios.CancelToken.source();

  const changePwdSchema = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().min(4, 'Password too short').required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.')
      .required()
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: changePwdSchema,
    onSubmit: async () => {
      await handleSubmit();
    }
  });

  const handleSubmit = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.CHANGE_PWD,
        method: 'PUT',
        cancelToken: sourceToken.token,
        data: {
          oldPassword: formik.values.oldPassword,
          newPassword: formik.values.newPassword
        }
      })
        .then((res) => {
          const data = res.data;

          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.detectSnackbarAlertVariant(data.responseCode)
          });
          formik.resetForm();

          if (responseUtil.responseIsSuccess(data.responseCode)) {
            dispatch(authAction.logoutUser());
            navigate(NAVIGATION_ROUTES.login);
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

  return <PasswordView formik={formik} isLoading={isLoading} />;
};

export default PasswordController;
