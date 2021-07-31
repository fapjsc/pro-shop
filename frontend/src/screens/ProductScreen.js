import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Style
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

// Component
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      console.log(data);
      setProduct(data);
    };

    fetchProduct();
  }, [match.params.id]);

  return (
    <>
      <Row className="">
        <Col>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </Col>
      </Row>

      <Row className="">
        <Col md={6} className="">
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3} className="">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{product.rating && <Rating value={product.rating} text={`${product.numReviews}review`} />}</ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>State:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-grid">
                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
