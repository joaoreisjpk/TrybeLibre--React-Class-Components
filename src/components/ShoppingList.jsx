import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      count: product.pCount,
    };
  }

  handleClick = async (param) => {
    const { count } = this.state;
    const { product: { available_quantity: quantity }, listUpdate, product } = this.props;
    if (param && quantity > count) {
      await this.setState({ count: Number(count) + 1 }, listUpdate(product, count + 1));
    } else if (count > 0 && !param) {
      await this.setState({ count: Number(count) - 1 }, listUpdate(product, count - 1));
    }
  }

  buttonsQuantity = () => {
    const { count } = this.state;
    return (
      <section className="buttonsQuantity">
        <div className="quantityDiv">
          <div className="quantity">
            <button
              type="button"
              onClick={ () => this.handleClick() }
              className="circular small red inverted ui icon button"
            >
              <i className="icon minus" />
            </button>
            <p className="count">{ count }</p>
            <button
              type="button"
              onClick={ () => this.handleClick(true) }
              className="circular small green inverted ui icon button"
            >
              <i className="icon plus" />
            </button>
          </div>
        </div>
      </section>
    );
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
      <section className="shoppingProductDiv">
        <button
          type="button"
          className="ui inverted button"
          onClick={ this.remove }
        >
          <i className="ui close big icon closeIcon" />
        </button>
        <Link
          to={ { pathname: `/details/${product.id}`, state: { product } } }
          style={ { color: 'black', display: 'flex', alignItems: 'center' } }
        >
          <img className="shoppingProductImg" src={ thumbnail } alt={ title } />
          <div className="productTitle">
            { title.length > MAXC ? `${title.slice(0, MAXC)}...` : title }
          </div>
        </Link>
        { this.buttonsQuantity() }
        <p className="productPrice">{ `R$ ${(price * count).toFixed(2)}` }</p>
      </section>
    );
  }
}

ShoppingList.propTypes = {
  product: PropTypes.shape([]),
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  attributes: PropTypes.shape([]),
}.isRequired;
