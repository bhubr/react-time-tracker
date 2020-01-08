import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import PageHeader from './components/PageHeader';
import TimeSliceCommentModal from './components/TimeSliceCommentModal';
import AuthForms from './components/AuthForms';

// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

// const TIMER_SLICE_DURATION = 10;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      modalOpen: false,
    };
  }

  componentDidMount() {
    document.title = 'Pomodoro';
  }

  onCommentSubmit = (comment) => {
    this.setState(({ timer }) => {
      if (!timer) return null;
      return {
        timer: { ...timer, comment },
        modalOpen: false,
      };
    });
  }

  render() {
    const { modalOpen } = this.state;
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return <AuthForms />
    }
    return (
      <div>
        <nav>
          <ul>
            <li>TrakT</li>
          </ul>
        </nav>
        <div className="container">
          <PageHeader />
          <TaskList
            startTimeSlice={this.startTimeSlice}
          />
          <TaskEdit />
          <TimeSliceCommentModal
            modalOpen={modalOpen}
            onCommentSubmit={this.onCommentSubmit}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  loggedIn: !!auth.user,
});

export default connect(mapStateToProps)(App);
