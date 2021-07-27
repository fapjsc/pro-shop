import { Fragment } from 'react';

// Components
import Product from '../components/Product';

// Style
import { Row, Col } from 'react-bootstrap';

// Dummy Data
import products from '../products';

const HomeScreen = () => {
  // Products List
  const productEl = products.map(product => (
    <Col sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ));

  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>{productEl}</Row>
    </Fragment>
  );
};

export default HomeScreen;
