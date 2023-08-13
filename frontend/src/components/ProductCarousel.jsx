import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../store/slices/productsApiSlice";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  const products = data?.data;

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || error?.error || "Error"}
    </Message>
  ) : (
    <Carousel pause="hover" className="bg-dark mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
