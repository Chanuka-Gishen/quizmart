import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Stack } from '@mui/material';
import { FormikProvider } from 'formik';

export const AddQuestionDialog = (props) => {
  const { open, handleClose, formikQuestion, handleCorrectAnswer } = props;

  const { errors, touched, handleSubmit, getFieldProps, values } = formikQuestion;

  return (
    <FormikProvider value={formikQuestion}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add question and answers, Minimum two answers required. Click on the check box belongs
            to the correct answer.
          </DialogContentText>
          <Stack direction={'column'} spacing={2}>
            <TextField
              fullWidth
              autoComplete="off"
              type="text"
              label="Question"
              {...getFieldProps('question')}
              error={Boolean(touched.question && errors.question)}
              helperText={touched.question && errors.question}
            />
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
                autoComplete="off"
                type="text"
                label="Answer One"
                {...getFieldProps('questionAnswerOne')}
                error={Boolean(touched.questionAnswerOne && errors.questionAnswerOne)}
                helperText={touched.questionAnswerOne && errors.questionAnswerOne}
              />
              <Checkbox
                label={'Correct answer'}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={values.questionCorrectAnswer === 1}
                onChange={() => handleCorrectAnswer(1)}
              />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
                autoComplete="off"
                type="text"
                label="Answer Two"
                {...getFieldProps('questionAnswerTwo')}
                error={Boolean(touched.questionAnswerTwo && errors.questionAnswerTwo)}
                helperText={touched.questionAnswerTwo && errors.questionAnswerTwo}
              />
              <Checkbox
                label={'Correct answer'}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={values.questionCorrectAnswer === 2}
                onChange={() => handleCorrectAnswer(2)}
              />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
                autoComplete="off"
                type="text"
                label="Answer Three"
                {...getFieldProps('questionAnswerThree')}
              />
              <Checkbox
                label={'Correct answer'}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={values.questionCorrectAnswer === 3}
                onChange={() => handleCorrectAnswer(3)}
              />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
                autoComplete="off"
                type="text"
                label="Answer Four"
                {...getFieldProps('questionAnswerFour')}
              />
              <Checkbox
                label={'Correct answer'}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={values.questionCorrectAnswer === 4}
                onChange={() => handleCorrectAnswer(4)}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </FormikProvider>
  );
};
