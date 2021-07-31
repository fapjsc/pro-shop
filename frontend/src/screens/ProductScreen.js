import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

// Component
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

// Action
import { productDetails, productDetailsClean } from '../actions/productAction';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(productDetails(match.params.id));

    return () => {
      dispatch(productDetailsClean());
    };
  }, [dispatch, match]);

  //==== React Element =====//
  const productDetailsEl = product && (
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
  );

  return (
    <Fragment>
      <Row className="">
        <Col>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </Col>
      </Row>

      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : productDetailsEl}
    </Fragment>
  );
};

export default ProductScreen;
