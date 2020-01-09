import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import axios from 'axios';
import { login as loginAction, fetchProfile as fetchProfileAction } from '../actions';

const forms = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
};

function AuthForms({ login, error, fetchProfile }) {
  // const [hello, setHello] = useState('');
  const [form, setForm] = useState(forms.LOGIN);
  const [credentials, setCredentials] = useState({
    email: '', password: '', name: '',
  });

  // useEffect(() => {
  //   console.log('fire effect', hello);
  //   const getHello = () => axios.get('/hello')
  //     .then((res) => res.data)
  //     .then(({ message }) => setHello(message));
  //   getHello();
  // }, []);

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

  const toggleForm = () => {
    const newForm = isLogin ? forms.REGISTER : forms.LOGIN;
    setForm(newForm);
  };

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

        <button type="button" onClick={toggleForm}>
          {
            isLogin
              ? 'No account? Register'
              : 'Have an account? Login'
          }
        </button>

      </form>

      <button type="button" onClick={fetchProfile}>Fetch profile</button>
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
  fetchProfile: fetchProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
