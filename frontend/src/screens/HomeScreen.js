import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { listProducts } from '../actions/productAction';

// Components
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

// Style
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //==== React Element =====//
  // Title El
  const titleEl = <h1>Latest Products</h1>;

  // Products List El
  const productEl =
    products &&
    products.map(product => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    ));

  return (
    <Fragment>
      {titleEl}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <Row>{productEl}</Row>}
    </Fragment>
  );
};

export default HomeScreen;
