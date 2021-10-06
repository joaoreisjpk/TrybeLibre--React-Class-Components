import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Style/ProductDetailing.css';
import Stars from '../components/Stars';

const CINCO = 5;

export default class ProductDetailing extends Component {
  constructor(props) {
    super(props);
    const { location: { state: { product } } } = this.props;
    const lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    let index;
    if (lista) index = lista.findIndex((item) => item.id === product.id);
    this.state = {
      count: (lista && lista.length) ? lista[index].pCount : 0,
      cartLength: 0,
    };
  }

  componentDidMount = () => {
    const lista = localStorage.getItem('shoppingCartList');
    if (!lista) localStorage.setItem('shoppingCartList', JSON.stringify([]));
    this.cartUpdate();
  }

  handleClick(param) {
    const { count } = this.state;
    const { location: { state } } = this.props;
    const { product: { available_quantity: quantity } } = state;
    if (param && quantity > count) this.setState({ count: Number(count) + 1 });
    else if (count > 0 && !param) this.setState({ count: Number(count) - 1 });
  }

  cartUpdate = () => {
    const lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    let cartLength = 0;
    if (lista) {
      lista.forEach((item) => {
        cartLength += item.pCount;
      });
    }
    this.setState({ cartLength });
  }

  handleStar = (e) => {
    const int = e.target.parentNode.id;
    if (e.target.classList.contains('yellow')) {
      console.log('contains'); this.removeStar(int);
    } else if (int > 1) this.addStar(int);
    else e.target.classList.add('yellow');
  }

  addStar = (int) => {
    const getList = document.getElementById(int).firstChild.classList;
    if (!getList.contains('yellow')) getList.add('yellow');
    if (int > 1) this.addStar(int - 1);
  }

  removeStar = (int) => {
    console.log(int, document.getElementById(int));
    const getList = document.getElementById(int).firstChild.classList;
    getList.remove('yellow');
    if (int < CINCO) this.removeStar(Number(int) + 1);
  }

  addToCart = (product) => {
    const { count } = this.state;
    let lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    // Caso o produto já esteja listado, apenas adiciona 1 à sua contagem(Pcount).
    if (lista.some((item) => item.id === product.id)) {
      const index = lista.findIndex((item) => item.id === product.id);
      lista[index] = { ...product, pCount: count };
      // Caso não exista o item é adiciona ao localStorage.
    } else lista = [...lista, { ...product, pCount: count }];
    localStorage.setItem('shoppingCartList', JSON.stringify(lista));
    localStorage.setItem('cartLength', lista.length);
    this.cartUpdate();
  };

  // Atualiza a o link da API para entregar imagens maiores (220x220px)
  thumbnail = () => {
    const { location: { state: { product: { thumbnail } } } } = this.props;
    let newThumb = '';
    for (let i = 0; i < thumbnail.length; i += 1) {
      if (thumbnail[i] === 'I') newThumb += 'V';
      else newThumb += thumbnail[i];
    }
    return newThumb;
  }

  avaliacao = () => (
    <section className="avaliacao">
      <h2>Avaliações</h2>
      <div className="avaliacaoForm">
        <form action="">
          <div style={ { display: 'flex', marginBottom: '15px' } }>
            <input className="evTitle" placeholder="Title" type="text" />
            <Stars int="1" onClick={ (e) => this.handleStar(e) } />
            <Stars int="2" onClick={ (e) => this.handleStar(e) } />
            <Stars int="3" onClick={ (e) => this.handleStar(e) } />
            <Stars int="4" onClick={ (e) => this.handleStar(e) } />
            <Stars int="5" onClick={ (e) => this.handleStar(e) } />
          </div>
          <textarea cols="45" rows="5" placeholder="Mensagem (opcional)" />
        </form>
        <button type="button" className="ui black basic button"> Avaliar </button>
      </div>
    </section>
  );

  buttonsQuantity = () => {
    const { location: { state: { product } } } = this.props;
    const { count } = this.state;
    return (
      <section className="buttonsQuantity">
        <div className="quantityDiv">
          <h3 className="quantityTitle">Quantidade</h3>
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
        <button
          type="button"
          onClick={ () => this.addToCart(product) }
          className=" ui compact black button addToCart"
        >
          Atualizar Carrinho
        </button>
      </section>
    );
  }

  render() {
    const { cartLength } = this.state;
    const { location: { state: { product } } } = this.props;
    const { title, price, attributes } = product;
    return (
      <div className="container">
        <section className="links">
          <Link to="../">
            <i className="reply big icon" />
          </Link>
          <Link to="/shoppingcart">
            <i className="shopping cart big icon">
              <span className="shopping-cart-size">{ cartLength }</span>
            </i>
          </Link>
        </section>
        <section className="titlePrice">
          <h2 style={ { marginRight: '10px' } }>
            { `${title}` }
            :
          </h2>
          <h2>
            { `R$ ${price.toFixed(2)}` }
          </h2>
        </section>
        <section className="imgDetails">
          <div className="img">
            <img
              src={ this.thumbnail() }
              alt={ title }
              style={ { width: '320px', height: '320px' } }
            />
          </div>
          <div className="details">
            <h2>Especificações técnicas:</h2>
            <ul className="UL">
              { attributes.map((attribute) => (
                <li key={ attribute.id }>
                  { `${attribute.name}: ${attribute.value_name}` }
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* Renderiza os três botões(adicionar, remover, attCard) e a contagem */}
        { this.buttonsQuantity() }
        {/* Renderiza o formulário com os inputs e as stars */}
        { this.avaliacao() }
        <div>.</div>
      </div>
    );
  }
}

ProductDetailing.propTypes = {
  location: PropTypes.shape([]),
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  attributes: PropTypes.shape([]),
}.isRequired;
