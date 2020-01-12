import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TaskList from './TaskList';
import ProjectList from './ProjectList';
import TaskEdit from './TaskEdit';
import PageHeader from './PageHeader';
import TimeSliceCommentModal from './TimeSliceCommentModal';

function Home({ modalOpen, onCommentSubmit }) {
  return (
    <Grid padded>
      <PageHeader />
      <Grid.Row>
        <Grid.Column>
          <TaskList />
        </Grid.Column>  
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <TaskEdit />
        </Grid.Column>  
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <TimeSliceCommentModal
            modalOpen={modalOpen}
            onCommentSubmit={onCommentSubmit}
          />
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
