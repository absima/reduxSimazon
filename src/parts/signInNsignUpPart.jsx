import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/useAuth';

import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { useNavigate, Form } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import {
  selectUser,
  selectError,
  registerUser,
  loginUser,
  logoutUser,
} from '../redux/userSlice';

export default function SignInOrSignUpPart({ flag }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log('-------user------', user);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  //
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, setRegister] = useState('');

  const { login } = useAuth();

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [nameValid, setNameValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const [successful, setSuccessful] = useState(false);

  console.log('user', user);
  console.log('flag', flag);
  console.log('successful', successful);

  const em = 'sima@meng.com';
  const pw = 'Password1';

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(String(password));
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(name));
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    if (!validateName(name)) {
      setNameError(
        'Name must be at least 2 characters long and contain only letters'
      );
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  };

  // handle username change
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (!validateName(username)) {
      setUsernameError(
        'Username must be at least 2 characters long and contain only letters'
      );
      setUsernameValid(false);
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError('Passwords do not match');
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }
  };

  // // submit handler for register
  // const registerSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (nameValid && usernameValid && emailValid && passwordValid) {
  //     dispatch(
  //       registerUser(name, username, email, password, confirmPassword)
  //     ).then((res) => {
  //       console.log('response ------', res);
  //       setSuccessful(true);
  //     });
  //   }
  // };

  const handleSubmitRegister = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: 'post',
      url: 'http://localhost:5050/user/register',
      data: {
        name,
        username,
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log('register set to true in config', register);
      })
      .catch((error) => {
        console.log('error here in registration');
        error = new Error();
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (flag === 'login') {
      dispatch(loginUser(username, password))
        .then((res) => {
          console.log('response ------', res);
          setSuccessful(true);
        })
        .catch((res) => {
          console.log(res);
          setSuccessful(false);
        });
    } else {
      dispatch(registerUser(name, username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  // login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    // const formData = Object.fromEntries(new FormData(e.currentTarget));
    // console.log('formmmmm dataaaaaa', formData);
    const res = await fetch('http://localhost:5050/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      mode: 'cors',
    });
    const token = await res.json();

    login(token, username);

    const to = `/profile/${username}`;
    console.log(to);
    return () => navigate(to, { replace: true });
  };

  // logout submit handler
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    return () => navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (flag === 'login') {
      if (emailValid && passwordValid) {
        setFormValid(true);
        dispatch(loginUser(email, password));
        console.log('error---------------', error);
      } else {
        setFormValid(false);
      }
    } else {
      if (emailValid && passwordValid && nameValid && confirmPasswordValid) {
        setFormValid(true);
        dispatch(registerUser(name, email, password));
      } else {
        setFormValid(false);
      }
    }
  }, [emailValid, passwordValid, nameValid, confirmPasswordValid]);

  useEffect(() => {
    if (user) {
      setEmail('');
      setPassword('');
      setName('');
      setConfirmPassword('');
    }
  }, [user]);

  return (
    <div className="container maindiv">
      {flag === 'login' ? (
        <Form
          className="form"
          onSubmit={
            // submitHandler
            handleSubmit
          }
        >
          <div>
            <h1>Sign In</h1>
          </div>
          <div>{error && <Message variant="danger">{error}</Message>}</div>

          <div>
            <label htmlFor="name">username</label>
            <input
              type="username"
              id="username"
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="buttoncolor" type="submit">
              Sign In
            </button>
          </div>
          <div>
            <label />
            <div>
              New customer? <Link to={`/register`}>Create your account</Link>
            </div>
          </div>
        </Form>
      ) : flag === 'register' ? (
        <Form className="form" onSubmit={handleSubmitRegister}>
          <div>
            <h1>Create Account</h1>
          </div>
          <div>{error && <Message variant="danger">{error}</Message>}</div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="name">username</label>
            <input
              type="username"
              id="username"
              placeholder="Choose username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Choose password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              placeholder="Re-Enter password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="buttoncolor" type="submit">
              Register
            </button>
          </div>
          <div>
            <label />
            <div>
              Already have an account? <Link to={`/login`}>Sign In</Link>
            </div>
          </div>
          {register ? navigate('/registered', { replace: true }) : null}
        </Form>
      ) : (
        <Form className="form" onSubmit={handleLogout}>
          <div>
            <h1>Sign Out</h1>
          </div>
          <div>
            {loading && <LoadingIndicator></LoadingIndicator>}
            {error && <Message variant="danger">{error}</Message>}
          </div>
          <div>
            <label />
            <button className="buttoncolor" type="submit">
              Sign Out
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

//   return (
//     <div className="sign-in-or-sign-up-part">
//       <div className="sign-in-or-sign-up-part__container">
//         <div className="sign-in-or-sign-up-part__container__title">
//           {flag === 'login' ? 'Sign In' : 'Sign Up'}
//         </div>
//         <div className="sign-in-or-sign-up-part__container__form">
//           <form onSubmit={submitHandler}>
//             {flag === 'register' && (
//               <div className="sign-in-or-sign-up-part__container__form__input">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder="Enter name"
//                   value={name}
//                   onChange={handleNameChange}
//                 />
//                 {nameError && <div className="error">{nameError}</div>}

//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={handleEmailChange}
//                 />
//                 {emailError && <div className="error">{emailError}</div>}

//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//                 {passwordError && <div className="error">{passwordError}</div>}

//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   placeholder="Confirm password"
//                   value={confirmPassword}
//                   onChange={handleConfirmPasswordChange}
//                 />
//                 {confirmPasswordError && (
//                   <div className="error">{confirmPasswordError}</div>
//                 )}
//               </div>
//             )}

//             {flag === 'login' && (
//               <div className="sign-in-or-sign-up-part__container__form__input">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={handleEmailChange}
//                 />
//                 {emailError && <div className="error">{emailError}</div>}

//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//                 {passwordError && <div className="error">{passwordError}</div>}
//               </div>
//             )}

//             <div className="sign-in-or-sign-up-part__container__form__button">
//               <button type="submit" disabled={!formValid}>
//                 {flag === 'login' ? 'Sign In' : 'Sign Up'}
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="sign-in-or-sign-up-part__container__switch">
//           {flag === 'login' ? (
//             <div>
//               Don't have an account?{' '}
//               <Link to="/register" className="link">
//                 Sign Up
//               </Link>
//             </div>
//           ) : (
//             <div>
//               Already have an account?{' '}
//               <Link to="/login" className="link">
//                 Sign In
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [name, setName] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   // const [flag, setFlag] = useState('login');

// //   useEffect(() => {
// //     if (email) {
// //       dispatch(fetchUserByEmail(email));
// //       // const user = useSelector(selectUser);
// //       // console.log(user);
// //       // if (user) {
// //       //   setEmail(user.email);
// //       //   setName(user.name);
// //       // }
// //     }
// //   }, [email, dispatch]);

// //   const submitHandler = (e) => {
// //     e.preventDefault();
// //     // if error,
// //     if (flag === 'login') {
// //       dispatch(loginUser(email, password ));
// //     } else {
// //       dispatch(
// //         registerUser(name, email, password, confirmPassword)
// //       );
// //     }
// //   };

// //   const logoutHandler = () => {
// //     dispatch(logoutUser());
// //   };

// //   const loggedInFunc = () => {
// //     // if successful login, show logout button
// //     return (
// //       <div>
// //         <button onClick={logoutHandler}>Logout</button>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div>
// //       <form className="form" onSubmit={submitHandler}>
// //         <div>
// //           <h1>{flag === 'login' ? 'Sign In' : 'Register'}</h1>
// //         </div>
// //         {/* {loading && <LoadingIndicator />}
// //         // {error && <div>{error}</div>} */}
// //         {flag === 'login' ? (
// //           <>
// //             <div>
// //               <label htmlFor="email">Email address</label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 placeholder="Enter email"
// //                 required
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="password">Password</label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 placeholder="Enter password"
// //                 required
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label />
// //               <button
// //                 className="buttoncolor"
// //                 type="submit"
// //                 onClick={
// //                   (e) => {
// //                     console.log('login button clicked');
// //                     console.log(e)
// //                     submitHandler(e)
// //                   }
// //                   // loggedInFunc
// //                   // loggedInFunc(email, password)
// //                   // console.log(login(email, password))
// //                 }
// //               >
// //                 Sign In
// //               </button>
// //             </div>
// //             <div>
// //               <label />
// //               <div>
// //                 New customer?{' '}
// //                 <Link
// //                   to={`/register`}
// //                   // onClick={somefunction}
// //                 >
// //                   Create your account
// //                 </Link>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <div>
// //               <label htmlFor="name">Name</label>
// //               <input
// //                 type="text"
// //                 id="name"
// //                 placeholder="Enter name"
// //                 required
// //                 onChange={(e) => setName(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="email">Email address</label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 placeholder="Enter email"
// //                 required
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="password">Password</label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 placeholder="Enter password"
// //                 required
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="confirmPassword">Confirm Password</label>
// //               <input
// //                 type="password"
// //                 id="confirmPassword"
// //                 placeholder="Enter confirm password"
// //                 required
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label />
// //               <button
// //                 className="buttoncolor"
// //                 type="submit"
// //                 // onClick={registerFunc}
// //               >
// //                 Register
// //               </button>
// //             </div>
// //             <div>
// //               <label />
// //               <div>
// //                 Already have an account?{' '}
// //                 <Link
// //                   to={`/login`}
// //                   // onClick={
// //                   //   // authenticate
// //                   //   loggedInFunc
// //                   // }
// //                 >
// //                   Sign-In
// //                 </Link>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </form>
// //     </div>
// //   );
// // }
