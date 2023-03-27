import { Grid, Typography } from '@mui/material';
import Page from 'components/Page';
import React from 'react';

export const ScoreView = () => {
  return (
    <Page title={'Scores'}>
      <Grid container justify="center" alignContent={'center'} spacing={2}>
        <Grid item xl={12} sm={12}>
          <Typography variant="h4" align="center">
            Participate in quizes to get scores
          </Typography>
        </Grid>
        {/* <Grid item xl={12} sm={12}>
          <img alt="empty" src="assets/images/empty.svg" />
        </Grid> */}
      </Grid>
    </Page>
  );
};
