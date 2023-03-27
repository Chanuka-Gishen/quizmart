import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateQuizView } from '../view/CreateQuizView';
import axios from 'axios';
import { backendAuthApi } from 'axios/instance/BackendAxiosInstance';
import { BACKEND_API } from 'axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';

const CreateQuizController = () => {
  const sourceToken = axios.CancelToken.source();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const QuestionSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    questionAnswerOne: Yup.string().required('Answer one is required'),
    questionAnswerTwo: Yup.string().required('Answer two is required'),
    questionAnswerThree: Yup.string(),
    questionAnswerFour: Yup.string(),
    questionCorrectAnswer: Yup.number().required('Correct answer is required')
  });

  const QuizSchema = Yup.object().shape({
    quizTopic: Yup.string().required('Quiz topic is required'),
    quizCatergory: Yup.string().required('Quiz catergory is required')
  });

  const formikQuestion = useFormik({
    initialValues: {
      question: '',
      questionAnswerOne: '',
      questionAnswerTwo: '',
      questionAnswerThree: '',
      questionAnswerFour: '',
      questionCorrectAnswer: null
    },
    validationSchema: QuestionSchema,
    onSubmit: async () => {
      await handleAddQuestion();
    }
  });

  const formikQuiz = useFormik({
    initialValues: {
      quizTopic: '',
      quizCatergory: null
    },
    validationSchema: QuizSchema,
    onSubmit: () => {}
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formikQuestion.resetForm();
    setOpen(false);
  };

  const handleSelect = (event) => {
    formikQuiz.setFieldTouched('quizCatergory', true);
    formikQuiz.setFieldValue('quizCatergory', event.target.value);
  };

  const handleCorrectAnswer = (id) => {
    switch (id) {
      case 1:
        formikQuestion.setFieldValue('questionCorrectAnswer', id);
        break;
      case 2:
        formikQuestion.setFieldValue('questionCorrectAnswer', id);
        break;
      case 3:
        formikQuestion.setFieldValue('questionCorrectAnswer', id);
        break;
      case 4:
        formikQuestion.setFieldValue('questionCorrectAnswer', id);
        break;
      default:
        break;
    }
  };

  const handleAddQuestion = () => {
    if (formikQuestion.isValid && formikQuestion.dirty) {
      setQuestions([
        ...questions,
        formikQuestion.values
      ])
      handleClose();
    }
  };

  const handleSubmit = async () => {
    if (formikQuiz.isValid && formikQuiz.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.QUIZ_CREATE,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          quizTopic: formikQuiz.values.quizTopic,
          quizCatergory: formikQuiz.values.quizCatergory,
          questions: questions
        }
      }).then((res) => {
        const data = res.data;
        if (responseUtil.responseIsSuccess(data.responseCode)) {
          enqueueSnackbar(data.responseMessage, {
            variant: SNACKBAR_VARIANT.SUCCESS
          });
          navigate(NAVIGATION_ROUTES.myQuiz);
        } else {
          enqueueSnackbar(data.responseMessage, {
            variant: SNACKBAR_VARIANT.ERROR
          });
        }
      }).catch(() => {
        setIsLoading(false);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <CreateQuizView
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      questions={questions}
      formikQuestion={formikQuestion}
      formikQuiz={formikQuiz}
      handleSelect={handleSelect}
      handleCorrectAnswer={handleCorrectAnswer}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default CreateQuizController;
