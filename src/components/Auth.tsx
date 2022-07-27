import React, { ChangeEvent, FormEvent } from 'react';
import './Auth.scss';

const Auth = () => {
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
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('e: ', e);
    console.log('submit');
  };

  return (
    <div className="auth">
      <div className="panel">
        <form action="" method="post" className="form" onSubmit={submitForm}>
          <div className="form-row">
            <div className="form-field-wrap">
              <input
                type="email"
                name="email"
                id="email"
                onChange={inputChange}
                tabIndex={1}
                aria-labelledby="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field-wrap">
              <input
                type="password"
                name="pwd"
                id="pwd"
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
