import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import MainPage from './pages/MainPage';
import ProductDetailing from './pages/ProductDetailing';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/">
            <Header />
            <MainPage />
          </Route>
          <Route
            path="/shoppingcart"
            render={ (props) => (
              <div>
                <Header />
                <ShoppingCart { ...props } />
              </div>
            ) }
          />
          <Route
            exact
            path="/details/:id"
            render={ (props) => (
              <div>
                <Header />
                <ProductDetailing { ...props } />
              </div>
            ) }
          />
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
