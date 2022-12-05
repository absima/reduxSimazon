// user profile page component
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../redux/userSlice';
// you are registered please login

const RegisteredPage = () => {
  return (
    <div className="registered-page">
      <div className="registered-page__container">
        <div className="registered-page__container__title">
          You are registered please login
        </div>
      </div>
    </div>
  );
};

export default RegisteredPage;

