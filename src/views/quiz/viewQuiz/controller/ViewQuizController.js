import axios from 'axios';
import { BACKEND_API } from 'axios/constant/BackendApi';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import responseUtil from 'utils/responseUtil';
import { QuizView } from '../view/ViewQuizView';

const ViewQuizController = () => {
  const navigate = useNavigate();
  const params = useParams();

  const sourceToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [data, setData] = useState([]);

  const onClickCancel = () => {
    navigate(NAVIGATION_ROUTES.dashboard);
  };

  useEffect(() => {
    if (!params.id) {
      navigate(NAVIGATION_ROUTES.dashboard);
    }

    const fetchQuiz = async () => {
      await backendAuthApi({
        url: BACKEND_API.QUIZ_GET,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          id: params.id
        }
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.responseIsSuccess(data.responseCode)) {
            setQuiz(data.responseData);
            setData(data.responseData.questions);
          } else {
            navigate(NAVIGATION_ROUTES.dashboard);
          }
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchQuiz();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <QuizView quiz={quiz} data={data} isLoading={isLoading} onClickCancel={onClickCancel} />;
};

export default ViewQuizController;
