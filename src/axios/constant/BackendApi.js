// Localhost url -> server-side
const IP_URL = 'http://localhost/api/public/backend';

// UOW server url
// const IP_URL = 'https://w1790816.users.ecs.westminster.ac.uk/api/public/index.php/backend';

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  SIGNUP: IP_URL + '/register',
  LOGIN: IP_URL + '/login',
  LOGOUT: IP_URL + '/logout',

  // USER API'S
  CHANGE_PWD: IP_URL + '/changePwd',
  CHANGE_USR_NAME: IP_URL + '/changeName',

  // QUIZ API'S
  QUIZ_ALL: IP_URL + '/quiz',
  QUIZ_USER: IP_URL + '/userQuiz',
  QUIZ_GET: IP_URL + '/getQuiz',
  QUIZ_CREATE: IP_URL + '/quiz',
  QUIZ_DELETE: IP_URL + '/quiz'
};
