import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutList from '../components/CheckoutList';

export default class Checkout extends React.Component {
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

  metodoDePagamento = () => (
    <section className="checkoutSection">
      <h3
        className="ui dividing header font"
        style={ { margin: '2px 15px 5px' } }
      >
        Método de Pagamento
      </h3>
      <div style={ { display: 'flex' } }>
        <div style={ { marginRight: '50px' } }>
          <h3 style={ { marginTop: '5px' } }>Boleto</h3>
          <label htmlFor="barcode">
            <input type="radio" id="barcode" name="payment" />
            <i className="barcode huge icon" />
          </label>
        </div>
        <div>
          <h3 style={ { marginTop: '5px' } }>Cartão de crédito</h3>
          <label htmlFor="visa">
            <input type="radio" id="visa" name="payment" />
            <spam style={ { margin: '0 10px' } }>Visa</spam>
            <i className="credit huge card icon" />
          </label>
          <label htmlFor="master">
            <input type="radio" id="master" name="payment" />
            <spam style={ { margin: '0 10px' } }>MasterCard</spam>
            <i className="credit huge card icon" />
          </label>
          <label htmlFor="elo">
            <input type="radio" id="elo" name="payment" />
            <spam style={ { margin: '0 10px' } }>Elo</spam>
            <i className="credit huge card icon" />
          </label>
        </div>
      </div>
    </section>
  )

  clientInfo = () => (
    <section className="checkoutSection">
      <h3
        className="ui dividing header font"
        style={ { margin: '2px 15px 5px' } }
      >
        Informações do Comprador
      </h3>
      <form action="">
        <section>
          <input className="checkoutInput" placeholder="Nome Completo" type="text" />
          <input className="checkoutInput" placeholder="CPF" type="text" />
          <input className="checkoutInput" placeholder="E-mail" type="text" />
          <input className="checkoutInput" placeholder="Telefone" type="text" />
        </section>
        <section>
          <input className="checkoutInput" placeholder="CEP" type="text" />
          <input className="checkoutInput" id="adr" placeholder="Endereço" type="text" />
        </section>
        <section>
          <input className="checkoutInput" id="7" placeholder="Complemento" type="text" />
          <input className="checkoutInput" id="num" placeholder="Número" type="text" />
          <input className="checkoutInput" id="city" placeholder="Cidade" type="text" />
          <input className="checkoutInput" id="10" placeholder="Estado" type="text" />
        </section>
      </form>
    </section>
  );

  render() {
    const { lista } = this.state;
    if (!lista) {
      return <div className="ui active inline loader" />;
    }
    return (
      <div className="container">
        <section style={ { margin: '30px 0' } }>
          <Link to="./shoppingcart">
            <i className="reply big icon" />
          </Link>
        </section>
        <section className="checkoutSection">
          <h3
            className="ui dividing header font"
            style={ { margin: '2px 15px 13px' } }
          >
            Revise Seus produtos
          </h3>
          {(lista.length < 1) ? (
            <div className="default-text">
              Seu carrinho está vazio
            </div>
          ) : lista.map((item) => (
            <CheckoutList
              key={ item.id }
              product={ item }
              onClick={ this.remove }
              listUpdate={ this.listUpdate }
            />
          ))}
          <div className="checkoutPrice">
            <b>Total: </b>
            { `  R$ ${this.subTotal().toFixed(2)}` }
          </div>
        </section>
        { this.clientInfo() }
        { this.metodoDePagamento() }
        <button className="ui black big button" type="button">Finalizar a Compra</button>
        <div style={ { marginTop: '20px' } }>.</div>
      </div>
    );
  }
}
