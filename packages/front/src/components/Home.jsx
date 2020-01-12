import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './TaskList';
import ProjectList from './ProjectList';
import TaskEdit from './TaskEdit';
import PageHeader from './PageHeader';
import TimeSliceCommentModal from './TimeSliceCommentModal';

function Home({ modalOpen, onCommentSubmit }) {
  return (
    <div className="container">
      <PageHeader />
      <ProjectList />
      <TaskList />
      <TaskEdit />
      <TimeSliceCommentModal
        modalOpen={modalOpen}
        onCommentSubmit={onCommentSubmit}
      />
    </div>
  );
}

Home.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
};

export default Home;
