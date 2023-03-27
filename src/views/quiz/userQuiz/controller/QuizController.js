import axios from 'axios';
import { BACKEND_API } from 'axios/constant/BackendApi';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import common_util from 'utils/common_util';
import responseUtil from 'utils/responseUtil';
import { QuizView } from '../view/QuizView';

const QuizController = () => {
  let sourceToken = axios.CancelToken.source();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onClickAddQuiz = () => {
    navigate(NAVIGATION_ROUTES.createQuiz);
  };

  const fetchQuiz = async () => {
    await backendAuthApi({
      url: BACKEND_API.QUIZ_USER,
      method: 'GET',
      CancelToken: sourceToken.token
    })
      .then((res) => {
        const data = res.data;

        if (!common_util.isUndefinedOrNull(data.responseData)) {
          setData(data.responseData);
        } else {
          setData(null);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (id) => {
    setIsDeleteLoading(true);
    setDeleteId(id);

    await backendAuthApi({
      url: BACKEND_API.QUIZ_DELETE,
      method: 'DELETE',
      cancelToken: sourceToken.token,
      data: {
        id: id
      }
    })
      .then((res) => {
        const data = res.data;

        enqueueSnackbar(data.responseMessage, {
          variant: responseUtil.detectSnackbarAlertVariant(data.responseCode)
        });

        if (responseUtil.responseIsSuccess(data.responseCode)) {
          fetchQuiz();
        }
      })
      .catch(() => {
        setIsDeleteLoading(false);
        setDeleteId(null);
      })
      .finally(() => {
        setIsDeleteLoading(false);
        setDeleteId(null);
      });
  };

  useEffect(() => {
    fetchQuiz();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizView
      data={data}
      isLoading={isLoading}
      isDeleteLoading={isDeleteLoading}
      deleteId={deleteId}
      onClickAddQuiz={onClickAddQuiz}
      handleDelete={handleDelete}
    />
  );
};

export default QuizController;
