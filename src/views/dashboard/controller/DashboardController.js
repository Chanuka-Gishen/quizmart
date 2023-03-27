import React, { useEffect, useState } from 'react';
import { DashboardApp } from '../view/DashboardApp';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import axios from 'axios';
import common_util from 'utils/common_util';
import { BACKEND_API } from 'axios/constant/BackendApi';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';

const DashboardController = () => {
  const navigate = useNavigate();
  let sourceToken = axios.CancelToken.source();

  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewQuiz = (id) => {
    navigate(NAVIGATION_ROUTES.quiz + id);
  };

  const fetchQuiz = async () => {
    if (common_util.isUndefinedOrNull(sourceToken)) {
      sourceToken = axios.CancelToken.source();
    }

    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.QUIZ_ALL,
      method: 'GET',
      cancelToken: sourceToken.token
    })
      .then((res) => {
        const data = res.data;
        if (!common_util.isUndefinedOrNull(data.responseData)) {
          setQuizList(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuiz();
    return () => {
      sourceToken.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DashboardApp isLoading={isLoading} quizList={quizList} handleViewQuiz={handleViewQuiz} />;
};

export default DashboardController;
