import { Fragment } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Screen
import HomeScreen from './screens/HomeScreen';

// Style
import './App.css';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
