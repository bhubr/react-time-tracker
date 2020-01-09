import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { login as loginAction } from '../actions';
import OAuth2Login from './oauth2-signin';

const forms = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
};

const oauth = {
  bitbucket: {
    authUrl: process.env.REACT_APP_BB_AUTH_URL,
    clientId: process.env.REACT_APP_BB_ID,
    redirectUri: process.env.REACT_APP_BB_CB_URL,
  },
};

function AuthForms({ login, error }) {
  const [form, setForm] = useState(forms.LOGIN);
  const [credentials, setCredentials] = useState({
    email: '', password: '', name: '',
  });

  const isLogin = form === forms.LOGIN;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newCredentials = { ...credentials, [name]: value };
    setCredentials(newCredentials);
  };

  const postOAuthCode = ({ code }) => axios.post(`/oauth/code/bitbucket?code=${code}`)
    .then(res => res.data)
    .then(console.log)
    .catch(console.error)

  // const toggleForm = () => {
  //   const newForm = isLogin ? forms.REGISTER : forms.LOGIN;
  //   setForm(newForm);
  // };
  console.log(process.env.REACT_APP_BB_AUTH_URL, window.location.search);
  const { bitbucket } = oauth;

  return (
    <div className="AuthForms">
      <form onSubmit={handleSubmit}>

        <h1>{isLogin ? 'Login' : 'Register'}</h1>

        {
          error && (
            <p className="AuthForms-error">{error}</p>
          )
        }

        <label htmlFor="email">
          Email
          <input id="email" name="email" type="text" onChange={handleChange} />
        </label>

        <label htmlFor="password">
          Password
          <input id="password" name="password" type="text" onChange={handleChange} />
        </label>

        <button type="submit">Go</button>

        <OAuth2Login
          buttonText="BitBucket"
          provider="bitbucket"
          authorizationUrl={bitbucket.authUrl}
          clientId={bitbucket.clientId}
          redirectUri={bitbucket.redirectUri}
          onSuccess={postOAuthCode}
          onFailure={(err) => console.error('error', err)}
        />

        {/* <button type="button" onClick={toggleForm}>
          {
            isLogin
              ? 'No account? Register'
              : 'Have an account? Login'
          }
        </button> */}

      </form>

    </div>
  );
}

AuthForms.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
});

const mapDispatchToProps = {
  login: loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
