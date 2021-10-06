import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckoutList extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      count: product.pCount,
    };
  }

  remove = () => {
    const { product, onClick } = this.props;
    onClick(product);
  }

  render() {
    // Ajudado pelo Jean Marcel
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    const { count } = this.state;
    const MAXC = 70;
    return (
      <section className="checkoutDiv">
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <img className="checkoutImg" src={ thumbnail } alt={ title } />
          <div className="checkoutTitle">
            { title.length > MAXC ? `${title.slice(0, MAXC)}...` : title }
          </div>
        </div>
        <p>{ `R$ ${(price * count).toFixed(2)}` }</p>
      </section>
    );
  }
}

CheckoutList.propTypes = {
  product: PropTypes.shape([]),
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  attributes: PropTypes.shape([]),
}.isRequired;
