import React, { ChangeEvent, FormEvent, useState } from 'react';
import { validateEmail } from '../utils/validateUtils';
import './Auth.scss';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const showPwd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const pwdField = document.querySelector('input[name="pwd"]') as HTMLElement;
    const button = e.target as HTMLElement;
    if (button && pwdField) {
      if (button.classList.contains('show')) {
        button.classList.remove('show');
        button.setAttribute('aria-pressed', 'false');
        pwdField.setAttribute('type', 'password');
      } else {
        button.classList.add('show');
        button.setAttribute('aria-pressed', 'true');
        pwdField.setAttribute('type', 'text');
      }

      pwdField.focus();
    }
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    elem.setAttribute('value', elem.value);

    if (e.target.id === 'email') {
      setEmail(e.target.value);
      setEmailError(false);
    }
    if (e.target.id === 'pwd') {
      setPassword(e.target.value);
      setPasswordError(false);
    }
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || !validateEmail(email)) {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }
    console.log('e: ', e);
    console.log('email', email);
    console.log('pwd', password);
  };

  return (
    <div className="auth">
      <div className="panel">
        <form action="" method="post" className="form" onSubmit={submitForm}>
          <div className="form-row">
            <div
              className={['form-field-wrap', emailError ? 'error' : ''].join(
                ' ',
              )}
            >
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={inputChange}
                tabIndex={1}
                aria-labelledby="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-row">
            <div
              className={['form-field-wrap', passwordError ? 'error' : ''].join(
                ' ',
              )}
            >
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={password}
                onChange={inputChange}
                tabIndex={2}
                aria-labelledby="Password"
              />
              <label htmlFor="pwd">Password</label>
              <button
                type="button"
                className="password"
                onClick={showPwd}
                tabIndex={3}
                aria-pressed="false"
                aria-label="Show password"
              ></button>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" tabIndex={4} aria-label="Submit form">
              Auth me
            </button>
          </div>
          <div className="form-row">
            <div className="forgot">
              Forgot password?{' '}
              <a href="/forgot" tabIndex={5}>
                Restore it!
              </a>
            </div>
          </div>
        </form>
        <div className="separator">
          <span>OR</span>
        </div>
        <button
          className="auth-google"
          tabIndex={6}
          aria-label="Auth with Google"
        >
          Auth with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
