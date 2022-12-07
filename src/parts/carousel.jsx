import productSlice from '../redux/productSlice';
import Carousel from 'react-bootstrap/Carousel';

<Row>
  <Carousel activeIndex={index} onSelect={handleSelect}>
    {products.map((item) => (
      <Carousel.Item>
        <Col key={'movie_' + String(item.rank)}>
          <img
            src={'/src/images/movies/' + String(item.rank) + '.jpg'}
            className="movies"
          />
        </Col>
        <Carousel.Caption className="carocaption">
          <button
            type="button"
            className="btn btn-buttoncolor button_perfumier"
            onClick={(event) => {
              !selected.includes(item.title) && selected.push(item.title);
              console.log(selected);
            }}
          >
            <i className="bi bi-play"> Add to Watch-list</i>
          </button>
          <h3 className="h3buttons"> some icons </h3>
          {/* <p>other butoon to be listened</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
</Row>;

// // function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   // };

// <Carousel activeIndex={index} onSelect={handleSelect}>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src={product.thumbnail}
//       alt="First slide"
//     />
//     <Carousel.Caption>
//       <h3>First slide label</h3>
//       <p>""a vitae elit libero, a pharetra augue mollis interdum.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
//   {
//     product.images.map((image, index) => (
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src = {image}
//           alt={index}
//         />
//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     ))
//   }
// </Carousel>;

// // <div
// //   id="carouselExampleControls"
// //   class="carousel slide"
// //   data-bs-ride="carousel"
// // >
// //   <div class="carousel-inner">
// //     <div class="carousel-item active">
// //       <img src={product.thumbnail} class="d-block w-100" alt="..." />
// //     </div>
// //     {product.images.map((image) => (
// //       <div class="carousel-item">
// //         <img src={img} class="d-block w-100" alt />
// //       </div>
// //     ))}
// //   </div>
// //   <button
// //     class="carousel-control-prev"
// //     type="button"
// //     data-bs-target="#carouselExampleControls"
// //     data-bs-slide="prev"
// //   >
// //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
// //     <span class="visually-hidden">Previous</span>
// //   </button>
// //   <button
// //     class="carousel-control-next"
// //     type="button"
// //     data-bs-target="#carouselExampleControls"
// //     data-bs-slide="next"
// //   >
// //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
// //     <span class="visually-hidden">Next</span>
// //   </button>
// // </div>;

// {
//   /*
// <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img class="d-block w-100" src="..." alt="First slide">
//     </div>
//     {
//       product.images.map((image, index) => (
//         <div class="carousel-item">
//           <img class="d-block w-100" src={image} alt="Second slide">
//         </div>
//       ))
//     }
//     <div class="carousel-item">
//       <img class="d-block w-100" src="..." alt="Second slide">
//     </div>
//     <div class="carousel-item">
//       <img class="d-block w-100" src="..." alt="Third slide">
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="sr-only">Previous</span>
//   </a>
//   <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="sr-only">Next</span>
//   </a>
// </div> */
// }
