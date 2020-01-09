import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import PageHeader from './components/PageHeader';
import TimeSliceCommentModal from './components/TimeSliceCommentModal';
import AuthForms from './components/AuthForms';
import { fetchProfile as fetchProfileAction, logout as logoutAction } from './actions';

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
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'Pomodoro';
    this.fetchProfile();
  }

  onCommentSubmit(comment) {
    this.setState(({ timer }) => {
      if (!timer) return null;
      return {
        timer: { ...timer, comment },
        modalOpen: false,
      };
    });
  }

  fetchProfile() {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  render() {
    const { modalOpen } = this.state;
    const { loggedIn, logout } = this.props;
    if (!loggedIn) {
      return <AuthForms />;
    }
    return (
      <div>
        <nav>
          <ul className="flex-grow">
            <li>TrakT</li>
          </ul>
          <ul>
            <li>
              <button
                type="button"
                className="Nav-btn"
                onClick={logout}
              >
                Logout
              </button>
            </li>
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
  fetchProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  loggedIn: !!auth.user,
});

const mapDispatchToProps = {
  fetchProfile: fetchProfileAction,
  logout: logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
