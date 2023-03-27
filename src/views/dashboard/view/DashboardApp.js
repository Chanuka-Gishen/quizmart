import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
// components
import Page from 'components/Page';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';

// ----------------------------------------------------------------------

const QuizCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export const DashboardApp = (props) => {
  const { quizList, isLoading, handleViewQuiz } = props;
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Grid
        container
        spacing={1}
        maxWidth="xl"
        style={{ backgroundColor: theme.palette.grey[200] }}
      >
        {isLoading ? (
          <Grid item xl={12} sm={12}>
            <LinearProgress />
          </Grid>
        ) : (
          <>
            {quizList.length === 0 ? (
              <Grid item xl={12} sm={12}>
                <Typography variant="body1">Quizes not available</Typography>
              </Grid>
            ) : (
              quizList.map((quiz, index) => {
                return (
                  <Grid item xl={12} sm={12} key={index}>
                    <QuizCard>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={4} align="left">
                          <Typography variant="body1">{quiz.quizTopic}</Typography>
                        </Grid>
                        <Grid item xs={4} align="left">
                          <Typography variant="body1">By {quiz.quizAuthor}</Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                          <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={() => handleViewQuiz(quiz.id)}
                          >
                            Start quiz
                          </Button>
                        </Grid>
                      </Grid>
                    </QuizCard>
                  </Grid>
                );
              })
            )}
          </>
        )}
      </Grid>
    </Page>
  );
};
