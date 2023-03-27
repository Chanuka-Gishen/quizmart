import React from 'react';
import DashboardLayout from '../layouts/dashboard';
import { DashboardApp, MyQuiz, Scores, CreateQuiz, Settings, ViewQuiz } from '../views';
import { NAVIGATION_ROUTES } from './constant/NavigationRoutes';

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    { path: '/', element: <DashboardApp /> },
    { path: NAVIGATION_ROUTES.dashboard, element: <DashboardApp /> },
    { path: NAVIGATION_ROUTES.myQuiz, element: <MyQuiz /> },
    { path: NAVIGATION_ROUTES.createQuiz, element: <CreateQuiz /> },
    { path: NAVIGATION_ROUTES.viewQuiz, element: <ViewQuiz /> },
    { path: NAVIGATION_ROUTES.scores, element: <Scores /> },
    { path: NAVIGATION_ROUTES.settings, element: <Settings /> }
  ]
};

export default MainRoutes;
