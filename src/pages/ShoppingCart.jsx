import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingList from '../components/ShoppingList';
import '../Style/ShoppingCart.css';

export default class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      lista: undefined,
    };
  }

  componentDidMount = async () => {
    let lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    lista = lista.filter((item) => item.pCount !== 0);
    await this.updateList(lista);
    this.subTotal();
  }

  updateList = async (lista) => {
    lista = lista.filter((item) => item.pCount !== 0);
    this.setState({ lista });
  }

  subTotal = () => {
    const { lista } = this.state;
    let subTotal = 0;
    lista.forEach((item) => {
      subTotal += item.price * item.pCount;
    });
    return subTotal;
  }

  remove = (product) => {
    let lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    console.log(product);
    lista = lista.filter((item) => {
      console.log(item.id); return item.id !== product.id;
    });
    localStorage.setItem('shoppingCartList', JSON.stringify(lista));
    this.setState({ lista });
  }

  listUpdate = (product, count) => {
    const lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    const index = lista.findIndex((item) => item.id === product.id);
    lista[index].pCount = count;
    localStorage.setItem('shoppingCartList', JSON.stringify(lista));
    this.setState({ lista });
  }

  render() {
    const { lista } = this.state;
    if (!lista) {
      return <div className="ui active inline loader" />;
    }
    if (lista.length === 0) {
      return (
        <div className="default-text">
          Seu carrinho está vazio
        </div>
      );
    }
    return (
      <div className="container">
        <section style={ { margin: '30px 0' } }>
          <Link to="../">
            <i className="reply big icon" />
          </Link>
          <div style={ { display: 'flex', margin: '30px 0' } }>
            <i className="shopping cart big icon" />
            <p className="cardTitle">Carrinho de Compras</p>
          </div>
        </section>
        {(lista.length < 1) ? (
          <div className="default-text">
            Seu carrinho está vazio
          </div>
        ) : lista.map((item) => (
          <ShoppingList
            key={ item.id }
            product={ item }
            onClick={ this.remove }
            listUpdate={ this.listUpdate }
          />
        ))}
        <div style={ { display: 'flex', justifyItems: 'center' } }>
          <div style={ { fontSize: '1.3rem', margin: '30px 0' } }>
            <b>Valor Total da Compra:</b>
            { ` R$ ${this.subTotal().toFixed(2)}` }
          </div>
          <Link to="../checkout">
            <button
              type="button"
              className="ui black button"
              style={ { margin: '20px 30px' } }
            >
              Finalizar a Compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
