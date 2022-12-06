import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
// import {
//   faYoutube,
//   faFacebook,
//   faTwitter,
//   faInstagram,
// } from '@fortawesome/free-solid-svg-icons';
// import { fa-square-facebook } from "@fortawesome/free-solid-svg-icons";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const FooterPart = () => {
  return (
    <footer className="footer">
      <Container  >
        <Row className="align-items-start">
          <Col md={3} sm={6} >
            <h3>Pages</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              {/* <li>
                <Link to="/profile">Profile</Link>
              </li> */}
            </ul>
          </Col>

          {/* <Col md={3}>
            <div className="footer-logo">
              <Link to="/">
                <img
                  src="/images/img.png"
                  alt="logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </Link>
            </div>
          </Col> */}
          <Col md={3} sm={6}>
            {/* <div className="footer-links"> */}
            <h3>Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* <li>
                <Link to="/contact">Contact</Link>
              </li> */}
            </ul>
            {/* </div> */}
          </Col>
          <Col md={3} sm={6}  >
            {/* <div className="footer-links"> */}
            <h3>Categories</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/products">Electronics</Link>
              </li>
              <li>
                <Link to="/products">Fragrance</Link>
              </li>
            </ul>
            {/* </div> */}
          </Col>
          <Col md={3} sm={6}>
            {/* <div className="footer-links"> */}
            <h3>Get in Touch</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/contact">Returns</Link>
              </li>
              <li>
                <Link to="/contact">Site Map</Link>
              </li>
            </ul>
            {/* </div> */}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="footer-logo">
              {/* <Link to="/">
                <img
                  src="/images/img.png"
                  alt="logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </Link> */}
            </div>
          </Col>
        </Row>
        <Row
        // customize height
          style={{
            height: '3rem',
          }}

         >

        </Row>
        <Row >
          <Col md={12}>
            <Link to="/">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faTwitter} size="lg"/>
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faInstagram} size="lg"/>
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faYoutube} size="lg"/>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterPart;

//               <div>
//                 <Link to="/about">About</Link>
//                 <Link to="/adress">Adress</Link>
//               </div>
//             </div>
//           </Col>
//           <Col md={3} sm={6}>
//             <div className="footer-links">
//               <h3>Help</h3>
//               <div>
//                 <Link to="/track">Track Order</Link>
//                 <Link to="/returns">Returns</Link>
//                 <Link to="/contact">Contact Us</Link>
//               </div>
//             </div>
//           </Col>
//           <Col md={3} sm={6}>
//             <div className="footer-links">
//               <h3>Follow Us</h3>
//               <div>
//                 <Link to="/#facebook">
//                   <FontAwesomeIcon icon={faFacebook} />
//                 </Link>
//                 <Link to="/#twitter">
//                   <FontAwesomeIcon icon={faTwitter} />
//                 </Link>
//                 <Link to="/#instagram">
//                   <FontAwesomeIcon icon={faInstagram} />
//                 </Link>
//                 <Link to="/#youtube">
//                   <FontAwesomeIcon icon={faYoutube} />
//                 </Link>
//               </div>
//               {/* <ul className='follow'>
//                 <li>
//                   <Link to="/#facebook">
//                     <FontAwesomeIcon icon={faFacebook} />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/#twitter">
//                     <FontAwesomeIcon icon={faTwitter} />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/#instagram">
//                     <FontAwesomeIcon icon={faInstagram} />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/#youtube">
//                     <FontAwesomeIcon icon={faYoutube} />
//                   </Link>
//                 </li>
//               </ul> */}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };
