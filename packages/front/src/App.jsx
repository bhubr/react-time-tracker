import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import AuthForms from './components/AuthForms';
import Workspaces from './components/Workspaces/Workspaces';
import Home from './components/Home';
import Navbar from './components/Navbar';
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
        <Navbar logout={logout} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Home {...props} modalOpen={modalOpen} onCommentSubmit={this.onCommentSubmit} />
            )}
          />
          <Route
            path="/workspaces"
            component={Workspaces}
          />
        </Switch>
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
