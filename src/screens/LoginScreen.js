import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { TeamContext } from '../App';

const LoginScreen = () => {
  // Hooks
  // -- state
  // ---- global
  const { setTeamInLocalStorage } = useContext(TeamContext);
  // ---- local

  // ------ login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  // ------ signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupImageUrl, setSignupImageUrl] = useState(
    'https://image.freepik.com/free-vector/bull-e-sports-team-logo-template_267565-2.jpg'
  );
  const [signupMessage, setSignupMessage] = useState('');
  // ref
  const loginEmailInputRef = useRef();
  const signupPasswordInputRef = useRef();
  const signUpEmailInputRef = useRef();
  // redirect
  const history = useHistory();
  // custom functions
  const loginTeam = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:5000/teams/login', {
        email: loginEmail,
        password: loginPassword,
      })
      .then((res) => {
        if (res.data.loginStatus === 'failed') {
          setLoginEmail('');
          setLoginPassword('');
          loginEmailInputRef.current.focus();
        } else if (res.data.loginStatus === 'success') {
          localStorage.setItem('team', res.data.teamId);
          setTeamInLocalStorage(true);
          history.push('/my-account');
        }
      })
      .catch((err) => setLoginMessage(err.response.data.message));
  };
  const signupTeam = (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setSignupMessage('Passwords do not match');
      setSignupPassword('');
      setSignupConfirmPassword('');
      signupPasswordInputRef.current.focus();
      return;
    }

    axios
      .post('http://127.0.0.1:5000/teams/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        image: signupImageUrl,
      })
      .then((res) => {
        if (res.data.registrationStatus === 'failed') {
          setSignupEmail('');
          setSignupPassword('');
          setSignupConfirmPassword('');
          signUpEmailInputRef.current.focus();
          setSignupMessage(res.data.message);
        } else if (res.data.registrationStatus === 'success') {
          localStorage.setItem('team', res.data.teamId);
          setTeamInLocalStorage(true);
          history.push('/my-account');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={loginTeam}>
        <label>Email</label>
        <input
          type='email'
          ref={loginEmailInputRef}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input type='submit' value='Log in' />
      </form>
      <p>{loginMessage}</p>
      <h2>Singup your team</h2>
      <form onSubmit={signupTeam}>
        <label>Team Name</label>
        <input type='text' onChange={(e) => setSignupName(e.target.value)} />
        <label>Email</label>
        <input
          type='email'
          onChange={(e) => setSignupEmail(e.target.value)}
          ref={signUpEmailInputRef}
        />
        <label>Password</label>
        <input
          type='password'
          onChange={(e) => setSignupPassword(e.target.value)}
          ref={signupPasswordInputRef}
        />
        <label>Confirm Password</label>
        <input
          type='password'
          onChange={(e) => setSignupConfirmPassword(e.target.value)}
        />
        <label>Team Logo url</label>
        <input
          type='text'
          value={signupImageUrl}
          onChange={(e) => setSignupImageUrl(e.target.value)}
        />
        <input type='submit' value='Signup' />
      </form>
      <p>{signupMessage}</p>
    </main>
  );
};

export default LoginScreen;
