import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {
  login as loginAction,
  loginSuccess as loginSuccessAction,
} from '../actions';
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

function AuthForms({ login, loginSuccess, error }) {
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
    .then((res) => res.data)
    .then(loginSuccess)
    .catch(console.error);

  // const toggleForm = () => {
  //   const newForm = isLogin ? forms.REGISTER : forms.LOGIN;
  //   setForm(newForm);
  // };
  const { bitbucket } = oauth;

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <span className="icon icon-small icon-stopwatch" /> TrakT
        </Header>
        <Header as='h3'>{isLogin ? 'Login' : 'Register'}</Header>

        {
          error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )
        }

        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="email"
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={handleChange}
            />

            <Button color='teal' fluid size='large'>
              Login
            </Button>
            <Grid style={{ padding: '1em 0' }}>
              <Grid.Column style={{ witdth: '50%' }}>
                <OAuth2Login
                  buttonText="BitBucket"
                  className="ui large teal button"
                  authorizationUrl={bitbucket.authUrl}
                  clientId={bitbucket.clientId}
                  redirectUri={bitbucket.redirectUri}
                  onSuccess={postOAuthCode}
                  onFailure={(err) => console.error('error', err)}
                />
              </Grid.Column>
              <Grid.Column style={{ witdth: '50%' }}>

              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

AuthForms.propTypes = {
  login: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
});

const mapDispatchToProps = {
  login: loginAction,
  loginSuccess: loginSuccessAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
