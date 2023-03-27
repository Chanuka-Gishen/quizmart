import React from 'react';
import { Button, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Page from 'components/Page';
import { styled, useTheme } from '@mui/styles';
import { fDate } from 'utils/formatTime';
import { LoadingButton } from '@mui/lab';

export const QuizView = (props) => {
  const { data, isLoading, isDeleteLoading, deleteId, onClickAddQuiz, handleDelete } = props;

  const theme = useTheme();

  const QuizCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  return (
    <Page title={'My Quiz'}>
      <Grid
        container
        maxWidth={'xl'}
        spacing={2}
        style={{ backgroundColor: theme.palette.grey[200] }}
      >
        <Grid item xl={12} sm={12}>
          <Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
            <Button
              variant="outlined"
              endIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={onClickAddQuiz}
            >
              Create New Quiz
            </Button>
          </Stack>
        </Grid>
        {isLoading ? (
          <Grid item xl={12} sm={12}>
            <LinearProgress />
          </Grid>
        ) : (
          <>
            {data == null ? (
              <Grid item xl={12} sm={12}>
                <Typography variant="body1" alignItems={'center'} justifyContent={'center'}>
                  Create quiz to display here
                </Typography>
              </Grid>
            ) : (
              <>
                {data.map((quiz, index) => {
                  return (
                    <Grid item xl={12} sm={12}>
                      <QuizCard key={index}>
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
                          <Grid item xs={3} align="left">
                            <Typography variant="body1">
                              Created on {fDate(quiz.created_at)}
                            </Typography>
                          </Grid>
                          <Grid item xs={3} align="right">
                            <Typography variant="body1">
                              {quiz.quizQuestions.length} Questions
                            </Typography>
                          </Grid>
                          <Grid item xs={1} align="right">
                            <LoadingButton
                              variant="outlined"
                              endIcon={<DeleteForeverIcon />}
                              loading={isDeleteLoading && deleteId === quiz.id}
                              onClick={() => handleDelete(quiz.id)}
                            >
                              Delete
                            </LoadingButton>
                          </Grid>
                          <Grid item xs={1} align="right">
                            <Button variant="outlined" endIcon={<ModeEditOutlineOutlinedIcon />}>
                              Edit
                            </Button>
                          </Grid>
                        </Grid>
                      </QuizCard>
                    </Grid>
                  );
                })}
              </>
            )}
          </>
        )}
      </Grid>
    </Page>
  );
};
