import React from 'react';
import Page from 'components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { AddQuestionDialog } from '../component/AddQuestionDialog';

import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Radio
} from '@mui/material';

export const CreateQuizView = (props) => {
  const {
    open,
    handleClickOpen,
    handleClose,
    questions,
    formikQuestion,
    formikQuiz,
    handleSelect,
    handleCorrectAnswer,
    handleSubmit,
    isLoading
  } = props;

  const { errors, touched, getFieldProps, values } = formikQuiz;

  return (
    <Page title={'Create'}>
      <Grid container maxWidth={'xl'} spacing={2}>
        <Grid item xl={12} sm={12}>
          <Breadcrumbs>
            <Link to={NAVIGATION_ROUTES.myQuiz} component={RouterLink}>
              My Quizes
            </Link>
            <Typography color="text.primary">Create Quiz</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xl={12} sm={12}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Quiz Topic"
              variant="outlined"
              fullWidth
              {...getFieldProps('quizTopic')}
              error={Boolean(touched.quizTopic && errors.quizTopic)}
              helperText={touched.quizTopic && errors.quizTopic}
            />
          </Stack>
        </Grid>
        <Grid item xl={6} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="-select-helper-label">Category</InputLabel>
            <Select
              labelId="select-helper-label"
              id="select-helper"
              value={values.quizCatergory}
              label="quizCatergory"
              onChange={handleSelect}
              error={Boolean(touched.quizCatergory && errors.quizCatergory)}
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Movie Musicals'}>Movie Musicals</MenuItem>
              <MenuItem value={'Fashion Through The Ages'}>Fashion Through The Ages</MenuItem>
              <MenuItem value={'Superheroes'}>Superheroes</MenuItem>
              <MenuItem value={'Urban Legends'}>Urban Legends</MenuItem>
              <MenuItem value={'Academy Awards'}>Academy Awards</MenuItem>
              <MenuItem value={'Video Games'}>Video Games</MenuItem>
              <MenuItem value={'History'}>History</MenuItem>
              <MenuItem value={'ICT'}>ICT</MenuItem>
              <MenuItem value={'Sports'}>Sports</MenuItem>
              <MenuItem value={'General Questions'}>General Questions</MenuItem>
              <MenuItem value={'Fun Facts'}>Fun Facts</MenuItem>
            </Select>
            <FormHelperText>{touched.quizTopic && errors.quizTopic}</FormHelperText>
          </FormControl>
        </Grid>
        {questions.length > 0 && (
          <>
            {questions.map((question, index) => {
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
                          checked={question.questionCorrectAnswer === 1}
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
                          value={2}
                          checked={question.questionCorrectAnswer === 2}
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
                            value={3}
                            checked={question.questionCorrectAnswer === 3}
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
                            value={4}
                            checked={question.questionCorrectAnswer === 4}
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
          </>
        )}
        <Grid item xl={12} sm={12}>
          <Stack direction={'row'} justifyContent={'end'}>
            <Button variant="outlined" onClick={() => handleClickOpen()}>
              Add Question
            </Button>
          </Stack>
        </Grid>
        <Grid item xl={12} sm={12}>
          <Stack direction={'row'} justifyContent={'end'}>
            <Button variant="outlined" onClick={handleSubmit} disabled={isLoading}>
              Create
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {open && (
        <AddQuestionDialog
          open={open}
          handleClose={handleClose}
          formikQuestion={formikQuestion}
          handleCorrectAnswer={handleCorrectAnswer}
        />
      )}
    </Page>
  );
};
