import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Styles
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';

// Action
import { addToCart, removeItemFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  //==== Get product id and qty ====//
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  //=== Redux ====//
  const { cartItems } = useSelector(state => state.cart);

  //==== Dispatch ====//
  const dispatch = useDispatch();

  //==== UseEffect ====//
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  //==== Function Handler ====//
  const onChangeQtyHandler = (productId, e) => {
    dispatch(addToCart(productId, Number(e.target.value)));
  };

  const checkoutHandler = () => {
    console.log('checkout');
    history.push('/login?redirect=shipping'); // 沒有登入 => /login, 有登入 => /shipping
  };

  const removeHandler = productId => {
    console.log('remove');
    dispatch(removeItemFromCart(productId));
  };

  //==== Jsx Element ====//
  // Empty El
  const emptyEl = (
    <Message>
      Your cart is empty <Link to="/">Go Back</Link>
    </Message>
  );

  // CartList El
  const cartListE = (
    <ListGroup variant="flush">
      {cartItems.map(item => (
        <ListGroup.Item key={item.product}>
          <Row>
            <Col md={2} className="">
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </Col>
            <Col md={2}>${(item.price * item.qty).toFixed(2)}</Col>
            <Col md={2}>
              <Form.Control as="select" value={item.qty} onChange={e => onChangeQtyHandler(item.product, e)}>
                {[...Array(item.countInStock).keys()].map(count => (
                  <option value={count + 1} key={count + 1}>
                    {count + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>

            <Col md={2}>
              <Button variant="light" onClick={() => removeHandler(item.product)}>
                <i className="fas fa-trash " />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  // SubTotal El
  const subTotalEl = (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
        </ListGroup.Item>

        <ListGroup.Item>
          <Button className="w-100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
            結賬
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );

  return (
    <Row>
      <Col lg={8}>
        <h2>shopping cart</h2>
        {cartItems.length === 0 ? emptyEl : cartListE}
      </Col>
      <Col lg={4}>{subTotalEl}</Col>
    </Row>
  );
};

export default CartScreen;
