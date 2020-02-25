import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TaskList from './TaskList';
import PageHeader from './PageHeader';
import TimeSliceCommentModal from './TimeSliceCommentModal';

function Home({ modalOpen, onCommentSubmit }) {
  return (
    <Grid padded>
      <PageHeader />
      <Grid.Row>
        <Grid.Column>
          <TaskList />
          {/* <TimeSliceCommentModal
            modalOpen={modalOpen}
            onCommentSubmit={onCommentSubmit}
          /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

Home.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
};

export default Home;
