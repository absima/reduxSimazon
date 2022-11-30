import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import {
  fetchUserByEmail,
  selectLoading,
  selectError,
  register,
  login,
  logout,
} from '../redux/customerSlice';

export default function SignInPart() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const loading = false; //useSelector(selectLoading);
  const error = null; //useSelector(selectError);
  const { email } = useParams();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [flag, setFlag] = useState('login');

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
      dispatch(register(nameInput, emailInput, passwordInput));
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
                <Link to={`/register`} onClick={() => setFlag('register')}>
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
                <Link to={`/login`} onClick={() => setFlag('login')}>
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

//   // // const userInfo = useSelector(selectUser);
//   // const { id } = useParams();

//   // // const user = useSelector(selectUser);
//   // // console.log(userInfo)
//   // const error = null; //useSelector(selectError);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // const [name, setName] = useState('');
//   // const [confirmPassword, setConfirmPassword] = useState('');
//   // const [message, setMessage] = useState(null);

//   // // redirect location
//   const redirect = location.search ? location.search.split('=')[1] : '/';

//   // console.log('user information');
//   // console.log('email', email);
//   // console.log;

//   // // register handler
//   // const registerHandler = (e) => {
//   //   e.preventDefault();
//   //   if (password !== confirmPassword) {
//   //     setMessage('Passwords do not match');
//   //   } else {
//   //     dispatch(register(name, email, password));
//   //   }
//   // };

//   // login handler
//   const loginHandler = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//     dispatch(login(email, password));
//   };

//   return (
//     <div>
//       <form className="form" onSubmit={loginHandler}>
//         <div>
//           <h1>Sign In</h1>
//         </div>
//         {loading && <LoadingBox></LoadingBox>}
//         {error && <MessageBox variant="danger">{error}</MessageBox>}
//         {/* {error && <div>{error}</div>} */}
//         <div>
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label />
//           <button className="primary" type="submit">
//             Sign In
//           </button>
//         </div>
//         <div>
//           <label />
//           <div>
//             New customer?{' '}
//             <Link to={`/register?redirect=${redirect}`}>
//               Create your account
//             </Link>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// //   // const userLogout = useSelector((state) => state.userLogout);
// //   // const { loading, error, userInfo } = userLogout;

// //   // const userGet = useSelector((state) => state.userGet);
// //   // const { loading, error, userInfo } = userGet;

// //   // const userUpdate = useSelector((state) => state.userUpdate);
// //   // const { loading, error, userInfo } = userUpdate;

// //   // const userDelete = useSelector((state) => state.userDelete);
// //   // const { loading, error, userInfo } = userDelete;

// //   // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
// //   // const { loading, error, userInfo } = userUpdateProfile;

// //   // const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
// //   // const { loading, error, userInfo } = userUpdatePassword;

// //   // const userForgotPassword = useSelector((state) => state.userForgotPassword);
// //   // const { loading, error, userInfo } = userForgotPassword;

// //   // const userResetPassword = useSelector((state) => state.userResetPassword);
// //   // const { loading, error, userInfo } = userResetPassword;

// //   // const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
// //   // const { loading, error, userInfo } = userVerifyEmail;

// //   // const userResendEmail = useSelector((state) => state.userResendEmail);
// //   // const { loading, error, userInfo } = userResendEmail;

// //   return (
// //     <div>
// //       <form className="form" onSubmit={submitHandler}>
// //         <div>
// //           <h1>Sign In</h1>
// //         </div>
// //         <div>
// //           <label htmlFor="email">Email address</label>
// //           <input
// //             type="email"
// //             id="email"
// //             placeholder="Enter email"
// //             required
// //             onChange={(e) => setEmail(e.target.value)}
// //           ></input>
// //         </div>
// //         <div>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             placeholder="Enter password"
// //             required
// //             onChange={(e) => setPassword(e.target.value)}
// //           ></input>
// //         </div>
// //         <div>
// //           <label />
// //           <button
// //           className="primary"
// //           type="submit"
// //           onClick={loginHandler}
// //           >
// //             Sign In
// //           </button>
// //         </div>
// //         <div>
// //           <label />
// //           <div>
// //             Forget password? <Link to="/resetpassword">Reset Password</Link>
// //           </div>
// //           <div>
// //             No account? <Link to="/register">Sign up</Link>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }
