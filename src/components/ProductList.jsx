import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  addToCart = (product) => {
    const { onClick } = this.props;
    let lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    // Caso o produto já esteja listado, apenas adiciona 1 à sua contagem(Pcount).
    if (lista.some((item) => item.id === product.id)) {
      const index = lista.findIndex((item) => item.id === product.id);
      lista[index] = { ...product, pCount: lista[index].pCount + 1 };
      // Caso não exista o item é adiciona à lista no localStorage.
    } else lista = [...lista, { ...product, pCount: 1 }];
    localStorage.setItem('shoppingCartList', JSON.stringify(lista));
    let cartLength = 0;
    if (lista) {
      lista.forEach((item) => {
        cartLength += item.pCount;
      });
    }
    onClick(cartLength);
  };

  thumbnail = () => {
    const { product: { thumbnail } } = this.props;
    let newThumb = '';
    for (let i = 0; i < thumbnail.length; i += 1) {
      if (thumbnail[i] === 'I') newThumb += 'C';
      else newThumb += thumbnail[i];
    }
    return newThumb;
  }

  doubleButton = () => {
    const { product, product: { id } } = this.props;
    return (
      <section className="doubleButton">
        <Link to={ { pathname: `/details/${id}`, state: { product } } }>
          <button
            className="ui gray animated fade button"
            type="button"
            style={ { padding: '0 10px', marginRight: '10px' } }
          >
            <div className="hidden content">
              <i className="eye icon" />
              <i className="eye icon" />
            </div>
            <div className="visible content">
              More Details
            </div>
          </button>
        </Link>
        <button
          className="ui green animated fade button"
          type="button"
          onClick={ () => this.addToCart(product) }
          style={ { padding: '0 10px', marginRight: '0' } }
        >
          <div className="hidden content">
            <i className="plus icon" />
            <i className="cart large icon" />
          </div>
          <div className="visible content">
            Add to Cart
          </div>
        </button>
      </section>
    );
  }

  render() {
    // Ajudado pelo Jean Marcel
    const { product } = this.props;
    const { title, price, id, shipping } = product;
    const MAXC = 70;
    return (
      <div className="productDiv">
        <Link to={ { pathname: `/details/${id}`, state: { product } } }>
          <section className="productImgTitle">
            <img src={ this.thumbnail() } alt={ title } className="productThumb" />
            <p className="productName">
              { title.length > MAXC ? `${title.slice(0, MAXC)}...` : title }
            </p>
          </section>
        </Link>
        <div className="productPriceButton">
          <section style={ { textAlign: 'center' } }>
            <p className="productPrice" style={ { fontSize: '1.4rem', width: '112px' } }>
              $
              { price && price.toFixed(2) }
            </p>
            {(shipping.free_shipping) ? (
              <div style={ { marginRight: '17px', color: 'red' } }>
                Frete Grátis
              </div>
            ) : (
              <div style={ { marginRight: '17px', color: 'gray' } }>
                Possui Frete
              </div>
            )}
          </section>
          { /* Retorna os botões More details e Add to Cart */ }
          { this.doubleButton() }
        </div>
      </div>
    );
  }
}
ProductList.propTypes = {
  product: PropTypes.shape([]),
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  attributes: PropTypes.shape([]),
}.isRequired;
