import { Fragment } from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Product from '../components/Product';

// Style
import { Row, Col } from 'react-bootstrap';

// Dummy Data

const HomeScreen = () => {
  // Init State
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      console.log(data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Products List
  const productEl = products.map(product => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
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
