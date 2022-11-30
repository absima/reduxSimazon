
// create register screen
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import { register } from '../redux/userSlice';

export default function RegisterPart(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.user);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingIndicator></LoadingIndicator>}
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
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
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
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
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}


// <>
//   <div>
//     <label htmlFor="name">Name</label>
//     <input
//       type="text"
//       id="name"
//       placeholder="Enter name"
//       required
//       onChange={(e) => setNameInput(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="email">Email address</label>
//     <input
//       type="email"
//       id="email"
//       placeholder="Enter email"
//       required
//       onChange={(e) => setEmailInput(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="password">Password</label>
//     <input
//       type="password"
//       id="password"
//       placeholder="Enter password"
//       required
//       onChange={(e) => setPasswordInput(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="confirmPassword">Confirm Password</label>
//     <input
//       type="password"
//       id="confirmPassword"
//       placeholder="Enter confirm password"
//       required
//       onChange={(e) => setConfirmPasswordInput(e.target.value)}
//     />
//   </div>
//   <div>
//     <label />
//     <button className="primary" type="submit">
//       Register
//     </button>
//   </div>
//   <div>
//     <label />
//     <div>
//       Already have an account?{' '}
//       <Link to={`/login`} onClick={() => setFlag('login')}>
//         Sign-In
//       </Link>
//     </div>
//   </div>
// </>;
