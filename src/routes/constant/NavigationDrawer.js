import PieChartIcon from '@mui/icons-material/PieChart';
import QuizIcon from '@mui/icons-material/Quiz';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NAVIGATION_ROUTES } from './NavigationRoutes';

const navigationDrawer = [
  {
    title: 'dashboard',
    path: NAVIGATION_ROUTES.dashboard,
    icon: <PieChartIcon />
  },
  {
    title: 'My Quiz',
    path: NAVIGATION_ROUTES.myQuiz,
    icon: <QuizIcon />
  },
  {
    title: 'My Scores',
    path: NAVIGATION_ROUTES.scores,
    icon: <SportsScoreIcon />
  },
  {
    title: 'Settings',
    path: NAVIGATION_ROUTES.settings,
    icon: <SettingsOutlinedIcon />
  }
];

export default navigationDrawer;
