import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import {
  fetchUserByEmail,
  register,
  login,
  logout,
} from '../redux/customerSlice';

export default function SignInOrSignUpPart({flag}) {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const loading = false; //useSelector(selectLoading);
  const error = null; //useSelector(selectError);
  const { email } = useParams();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  // const [flag, setFlag] = useState('login');

  useEffect(() => {
    if (email) {
      dispatch(fetchUserByEmail(email));
    }
  }, [email, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (flag === 'login') {
      dispatch(login(emailInput, passwordInput));
    } else {
      console.log('register');
      console.log(nameInput, emailInput, passwordInput, confirmPasswordInput);
      dispatch(register(nameInput, emailInput, passwordInput, confirmPasswordInput));
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const loggedInfunc = () => {
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{flag === 'login' ? 'Sign In' : 'Register'}</h1>
        </div>
        {/* {loading && <LoadingIndicator />}
        {error && <div>{error}</div>} */}
        {flag === 'login' ? (
          <>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button 
              className="primary" 
              type="submit" 
              // onClick={loggedInFunc}
              >
                Sign In
              </button>
            </div>
            <div>
              <label />
              <div>
                New customer?{' '}
                <Link to={`/register`} 
                // onClick={somefunction}
                >
                  Create your account
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                required
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                required
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Register
              </button>
            </div>
            <div>
              <label />
              <div>
                Already have an account?{' '}
                <Link to={`/login`} 
                // onClick={function}
                >
                  Sign-In
                </Link>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
