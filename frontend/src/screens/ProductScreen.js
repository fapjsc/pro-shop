import { Link } from 'react-router-dom';

// Style
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

// Component
import Rating from '../components/Rating';

// Dummy Data
import products from '../products';

const ProductScreen = ({ match }) => {
  const product = products.find(el => el._id === match.params.id);
  console.log(product);

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
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews}review`} />
            </ListGroup.Item>
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
