import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/productSlice';
import { logoutUser, selectUser } from '../redux/userSlice';

const HeaderPart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const controller = Object.keys(params).length;
  // const [user, setUser] = useState(userInfo);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const cartItems =
    cart.length > 0 ? cart.reduce((acc, item) => acc + item.num, 0) : 0;

  console.log('user', user);
  console.log('parammmmms', params);
  console.log(controller);

  // const fetchCurrentUser = async () => {
  //   const response = await fetch('http://localhost:5050/user/profile', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username: params.username }),
  //   });
  //   const data = await response.json();
  //   setUser(data);
  // };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, [params.username]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.num) + qty, 0);
  };

  const signout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    // dispatch({ type: USER_SIGNOUT });
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: search });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <header className="header">
      <Container
      // className="grid-container"
      >
        <Row>
          <Col xs={12} md={3}>
            {/* <div className="logo">
                <Link to="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              </div> */}
            <div>
              <Link className="brand" to="/">
                simazon
              </Link>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="search">
              {/* <div className="dropdown">
                <button onClick={handleOpen}>Categories</button>
                {open ? (
                  <ul className="menu">
                    <li className="menu-item">
                      <button onClick={handleMenuOne}>Electronics</button>
                    </li>
                    <li className="menu-item">
                      <button onClick={handleMenuTwo}>Fragrance</button>
                    </li>
                  </ul>
                ) : ""}
              </div> */}
              <select
                className="selectCategory"
                name="category"
                id=""
                value={searchParams.get('category') || ''}
                onChange={
                  handleSearch
                  // (e) => {setSearchParams({ category: e.target.value });}
                }
              >
                <option value="">All</option>
                <option value="">Electronics</option>
                <option value="">Fragrance</option>
              </select>

              <input
                className="input"
                placeholder="Search..."
                type="text"
                name="q"
                onChange={(e) => setSearchParams({ q: e.target.value })}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="cart">
              <Link to="/cart">
                Cart
                <FontAwesomeIcon icon={faCartShopping} />
                {cartItems.length > 0 && (
                  <span className="badge">{getCartCount()}</span>
                )}
              </Link>
              {controller ? (
                <div className="dropdown">
                  <Link to="#">
                    {params.username} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link
                        to="#profile"
                        // onClick={handleLogout}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#orders"
                        // onClick={handleLogout}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#message"
                        // onClick={handleLogout}
                      >
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#setting"
                        // onClick={handleLogout}
                      >
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={
                          // handleLogout
                          signout
                        }
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderPart;

