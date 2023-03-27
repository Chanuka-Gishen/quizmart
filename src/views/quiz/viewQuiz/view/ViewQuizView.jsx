import React from 'react';
import {
  Breadcrumbs,
  Button,
  Grid,
  LinearProgress,
  Link,
  Radio,
  Stack,
  Typography
} from '@mui/material';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { Link as RouterLink } from 'react-router-dom';

export const QuizView = (props) => {
  const { quiz, data, isLoading, onClickCancel } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xl={12} sm={12}>
        <Breadcrumbs>
          <Link to={NAVIGATION_ROUTES.dashboard} component={RouterLink}>
            Dashboard
          </Link>
          <Typography color="text.primary">{isLoading ? 'Loading...' : quiz.quizTopic}</Typography>
        </Breadcrumbs>
      </Grid>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          {data.map((question, index) => {
            return (
              <Grid item xl={12} sm={12} key={index}>
                <Grid container spacing={1} justifyContent={'center'}>
                  <Grid item xl={12} sm={12}>
                    {index + 1} . {question.question}
                  </Grid>
                  <Grid item xl={6} sm={6}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Radio
                        onChange={null}
                        value={1}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                      />
                      <Typography variant="body1">{question.questionAnswerOne}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xl={6} sm={6}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Radio
                        onChange={null}
                        value={1}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                      />
                      <Typography variant="body1">{question.questionAnswerTwo}</Typography>
                    </Stack>
                  </Grid>
                  {question.questionAnswerThree && (
                    <Grid item xl={6} sm={6}>
                      <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Radio
                          onChange={null}
                          value={1}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                        <Typography variant="body1">{question.questionAnswerThree}</Typography>
                      </Stack>
                    </Grid>
                  )}
                  {question.questionAnswerFour && (
                    <Grid item xl={6} sm={6}>
                      <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Radio
                          onChange={null}
                          value={1}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                        <Typography variant="body1">{question.questionAnswerFour}</Typography>
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            );
          })}
          <Grid item xl={1}>
            <Button variant="outlined" onClick={onClickCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xl={1}>
            <Button variant="outlined">Submit</Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
