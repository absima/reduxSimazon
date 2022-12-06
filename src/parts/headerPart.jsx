import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Form, Link, useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/productSlice';
import { logoutUser, selectUser } from '../redux/userSlice';

// import { useAuth } from '../auth/useAuth';

export default function HeaderPart() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const [searchParams, setSearchParams] = useSearchParams();
  const prms = useParams();
  const controller = prms.username ? 1 : 0;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);

  const cartItems =
    cart.length > 0 ? cart.reduce((a, item) => a + item.num, 0) : 0;
  console.log('prms prms prms prms prms prms ', useParams());
  console.log('usr usr usr usr usr usr usr ', user);
  console.log('cart cart cart cart cart cart ', cart);
  console.log('cartItems cartItems cartItems cartItems ', cartItems);
  console.log('searchParams searchParams searchParams ', searchParams);
  console.log('search search search search ', search);
  console.log('filter filter filter filter ', filter);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setSearchParams({ filter: e.target.value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(!open);
  };

  const handleMenuTwo = () => {
    setOpen(!open);
  };

  const handleMenuThree = () => {
    setOpen(!open);
  };

  const handleClear = () => {
    setSearch('');
    setFilter('');
    setSearchParams({});
  };

  // submit search handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter) {
      setSearchParams({ filter: filter });
    } else {
      setSearchParams({});
    }
    setSearch('');
    // close search bar
    setOpen(false);
    // redirect to search page
    window.location.href = '/search?filter=' + filter;
  };

  //   let params = serializeFormQuery(searchParams);
  //   if (params) {
  //     setSearchParams({ filter: params });
  //   } else {
  //     setSearchParams({});
  //   }
  //   console.log('------params in handle', params)

  //   setSearch('');
  //   // close search bar
  //   setOpen(false);
  //   // redirect to search page
  //   window.location.href = '/search';
  // };

  // serialize form data
  const serializeFormQuery = (params) => {
    let query = '';
    for (let [key, value] of params) {
      query += `${key}=${value}&`;
    }
    return query;
  };

  useEffect(() => {
    if (search) {
      setSearchParams({ filter: search });
    }
  }, [search]);

  return (
    <header className="header">
      <Container>
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
              <select
                className="selectCategory"
                name="category"
                value={filter}
                // value = {searchParams.get("filter") || ""}
                onChange={handleSearch}
              >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Furniture">Furniture</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Shoes">Shoes</option>
              </select>
              <Form
                onSubmit={
                  handleSubmit
                  // handleFilter
                }
              >
                <input
                  className="input"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  value={filter}
                  onChange={
                    handleFilter
                    // handleSubmit
                  }
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </Form>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="header__cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                {cartItems > 0 && <span className="badge">{cartItems}</span>}
              </Link>
              {controller ? (
                <div className="dropdown">
                  <Link to="/#">
                    {prms.username} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/#">Profile</Link>
                    </li>
                    <li>
                      <Link to="/#">Orders</Link>
                    </li>
                    <li>
                      <Link to="/#">Messages</Link>
                    </li>
                    <li>
                      <Link to="/#">Setting</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={handleLogout}>
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

// v1

// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { Form, Link, useSearchParams, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectCart } from '../redux/productSlice';
// import { logoutUser, selectUser } from '../redux/userSlice';
// import { useAuth } from '../auth/useAuth';

// export default function HeaderPart() {
//   const auth = useAuth();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const [search, setSearch] = useState('');
//   const [open, setOpen] = React.useState(false);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const controller = Object.keys(params).length;
//   // const [user, setUser] = useState(userInfo);
//   const user = useSelector(selectUser);
//   const cart = useSelector(selectCart);

//   const cartItems =
//     cart.length > 0 ? cart.reduce((acc, item) => acc + item.num, 0) : 0;

//   console.log('user', user);
//   console.log('parammmmms', params);
//   console.log(controller);
//   console.log('search params', searchParams);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((qty, item) => Number(item.num) + qty, 0);
//   };

//   const signout = () => {
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('cartItems');
//     // dispatch({ type: USER_SIGNOUT });
//   };

//   // handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let params = new URLSearchParams();
//     if (search) {
//       console.log('search', search);
//       params.append('filter', search);
//       setSearchParams(params);
//     }
//   };

//   // handle search
//   const handleSearch = (event) => {
//     const filter = event.target.value;
//     console.log('filter', filter);
//     if (filter) {
//       setSearchParams({ filter });
//     } else {
//       setSearchParams({});
//     }
//   };

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   const handleMenuOne = () => {
//     // do something
//     setOpen(false);
//   };

//   const handleMenuTwo = () => {
//     // do something
//     setOpen(false);
//   };

//   // handle submit search form
//   const searchsubmit = (e) => {
//     e.preventDefault();
//     let params = new URLSearchParams();
//     if (search) {
//       console.log('search', search);
//       params.append('filter', search);
//       setSearchParams(params);
//     }
//   };

//   useEffect(() => {
//     if (searchParams.get('filter')) {
//       setSearch(searchParams.get('filter'));
//     } else {
//       setSearch('');
//     }
//   }, [searchParams]);

//   return (
//     <header className="header">
//       <Container
//       // className="grid-container"
//       >
//         <Row>
//           {/* simazon */}
//           <Col xs={12} md={3}>
//             {/* <div className="logo">
//                 <Link to="/">
//                   <img src="/images/logo.png" alt="logo" />
//                 </Link>
//               </div> */}
//             <div>
//               <Link className="brand" to="/">
//                 simazon
//               </Link>
//             </div>
//           </Col>
//           {/* search bar */}
//           <Col xs={12} md={6}>
//             <div className="search">
//               <Form onSubmit={handleSubmit}>
//                 <input
//                   name="search"
//                   value={search}
//                   onChange={handleSearch}
//                   placeholder="Search by ID or name or type ..."
//                 />
//                 <button type="button" onClick={handleOpen}>
//                   <i className="fa fa-filter"></i>
//                 </button>
//                 {open && (
//                   <div className="filter">
//                     <label htmlFor="filter">Filter by</label>
//                     <select
//                       name="filter"
//                       value={filter}
//                       onChange={handleFilter}
//                     >
//                       <option value="">All</option>
//                       <option value="id">ID</option>
//                       <option value="name">Name</option>
//                       <option value="type">Type</option>
//                     </select>
//                   </div>
//                 )}
//                 <button type="submit">
//                   <i className="fa fa-search"></i>
//                 </button>
//               </Form>
//             </div>
//           </Col>
//           {/* cart */}
//           <Col xs={12} md={3}>
//             <div className="cart">
//               <Link to="/cart">
//                 Cart
//                 <FontAwesomeIcon icon={faCartShopping} />
//                 {cartItems.length > 0 && (
//                   <span className="badge">{getCartCount()}</span>
//                 )}
//               </Link>

//               {controller ? (
//                 <div className="dropdown">
//                   <Link to="#">
//                     {params.username} <i className="fa fa-caret-down"></i>{' '}
//                   </Link>
//                   <ul className="dropdown-content">
//                     <li>
//                       <Link
//                         to="#profile"
//                         // onClick={handleLogout}
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="#orders"
//                         // onClick={handleLogout}
//                       >
//                         Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="#message"
//                         // onClick={handleLogout}
//                       >
//                         Messages
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="#setting"
//                         // onClick={handleLogout}
//                       >
//                         Setting
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/login"
//                         onClick={
//                           // handleLogout
//                           signout
//                         }
//                       >
//                         Sign Out
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 <Link to="/login">Sign In</Link>
//               )}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </header>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { Form, Link, useSearchParams, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectCart } from '../redux/productSlice';
// import { logoutUser, selectUser } from '../redux/userSlice';
// import SearchPart from './searchPart';

// const HeaderPart = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const cart = useSelector(selectCart);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const prms = useParams();
//   const controller = Object.keys(prms).length;
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('');
//   const [open, setOpen] = useState(false);

//   const cartItems =
//     cart.length > 0 ? cart.reduce((a, item) => a + item.num, 0) : 0;

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleFilter = (e) => {
//     setFilter(e.target.value);
//     setSearchParams({ filter: e.target.value });
//   };

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   const handleMenuOne = () => {
//     setOpen(!open);
//   };

//   const handleMenuTwo = () => {
//     setOpen(!open);
//   };

//   const handleMenuThree = () => {
//     setOpen(!open);
//   };

//   const handleClear = () => {
//     setSearch('');
//     setFilter('');
//     setSearchParams({});
//   };

//   // submit search handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let params = serializeFormQuery(searchParams);
//     if (params) {
//       setSearchParams({ filter: params });
//     } else {
//       setSearchParams({});
//     }
//     setSearch('');
//     // close search bar
//     setOpen(false);
//     // redirect to search page
//     window.location.href = '/search';
//   };

//   // serialize form data
//   const serializeFormQuery = (params) => {
//     let query = '';
//     for (let [key, value] of params) {
//       query += `${key}=${value}&`;
//     }
//     return query;
//   };

//   useEffect(() => {
//     if (search) {
//       setSearchParams({ filter: search });
//     }
//   }, [search]);

//   return (
//     <header className="header">
//       <Container>
//         <Row>
//           <Col md={3} className="header__logo">
//             <div>
//               <Link className="brand" to="/">
//                 {/* <img
//                 src="/images/img.png"
//                 alt="logo"
//                 style={{ width: '100px', height: '100px' }}
//               /> */}
//                 {/* Simazon */}
//                 <h1>Shop</h1>
//               </Link>
//             </div>
//           </Col>
//           <Col xs={12} md={6} className="search">
//             <SearchPart
//               search={search}
//               filter={filter}
//               open={open}
//               handleSearch={handleSearch}
//               handleFilter={handleFilter}
//               handleOpen={handleOpen}
//               handleSubmit={handleSubmit}
//             />
//           </Col>
//           <Col xs={12} md={3}>
//             <div className="cart">
//               <Link to="/cart">
//                 Cart <FontAwesomeIcon icon={faCartShopping} />
//                 {cartItems.length > 0 && (
//                   <span className="badge">{cartItems}</span>
//                 )}
//               </Link>
//               {controller ? (
//                 <div className="dropdown">
//                   <Link to="/profile">
//                     <img
//                       src={user.avatar ? user.avatar : '/images/img.png'}
//                       alt="avatar"
//                     />
//                     <span>{prms.username}</span>
//                     <i className="fas fa-chevron-down"></i>
//                     {/* {user.role === 'admin' && ( */}{' '}
//                     <div className="dropdown-content">
//                       {/* <Link to="/dashboard">Dashboard</Link> */}
//                       <Link to="/profile">Profile</Link>
//                       <Link to="/setting">Setting</Link>
//                       <Link to="/messages">Messages</Link>
//                       <Link to="/orders">Orders</Link>
//                       <Link to="/" onClick={handleLogout}>
//                         Logout
//                       </Link>
//                     </div>
//                   </Link>
//                 </div>
//               ) : (
//                 <Link to="/login">
//                   <img src="/images/img.png" alt="avatar" />
//                   <span>Sign In</span>
//                 </Link>
//               )}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default HeaderPart;
