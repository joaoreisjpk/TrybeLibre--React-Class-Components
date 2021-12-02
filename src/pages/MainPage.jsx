/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import '../Style/ProductList.css';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriaId: '',
      query: 'notebook',
      categoriaList: [],
      productList: [],
      cartLength: undefined,
      loading: false,
    };
  }

  filterList = (id) => {
    this.setState({ categoriaId: id }, () => this.handleClick());
    console.log(id);
  }

  categoryList = () => {
    const { categoriaList } = this.state;
    return (
      categoriaList.map((categoria) => (
        <Categories
          key={ categoria.id }
          categoria={ categoria }
          onClick={ this.filterList }
        />
      ))
    );
  }

  shoppingCartIcon = () => {
    const { cartLength } = this.state;
    return (cartLength || cartLength === 0 ? (
      <Link to="/shoppingcart">
        <i className="shopping cart big icon">
          <span className="shopping-cart-size">
            { cartLength }
          </span>
        </i>
      </Link>
    ) : <div className="ui active inline loader" />
    );
  }

  searchBar = () => {
    const { query } = this.state;
    return (
      <section className="searchbar">
        <div className="ui icon input search-input">
          <input
            type="text"
            id="query"
            value={ query }
            onChange={ this.handleChange }
          />
          <button
            className="ui blue basic button"
            type="button"
            onClick={ this.handleClick }
          >
            <i className="search left icon" />
            Pesquisar
          </button>

        </div>
        { this.shoppingCartIcon() }
      </section>
    );
  }

  defaultText = () => (
    <div className="default-text">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </div>
  );

  productList = () => {
    const { productList } = this.state;
    return (
      <div className="productList">
        <link rel="stylesheet" href="../Style/productList" />
        { productList.map((product) => (
          <ProductList
            key={ product.id }
            product={ product }
            onClick={ this.onClick }
          />))}
      </div>
    );
  }

  attNumber = () => {
    const lista = JSON.parse(localStorage.getItem('shoppingCartList'));
    let cartLength = 0;
    if (lista) {
      lista.forEach((item) => {
        cartLength += item.pCount;
      });
    }
    this.setState({ cartLength });
  }

  componentDidMount = async () => {
    const fetchAPi = await getCategories();
    // const fetchItem = await getProductsFromCategoryAndQuery(query, categoriaId);
    const lista = localStorage.getItem('shoppingCartList');
    if (!lista) localStorage.setItem('shoppingCartList', JSON.stringify([]));
    this.categoriesList(fetchAPi);
    this.attNumber();
    this.handleClick();
  }

  handleChange = async ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  }

  handleClick = async () => {
    const { categoriaId, query } = this.state;
    this.setState({ loading: true });
    const fetchItem = await getProductsFromCategoryAndQuery(query, categoriaId);
    if (fetchItem) this.setState({ productList: fetchItem.results, loading: false });
  }

  onClick = (param) => {
    this.setState({ cartLength: param });
  }

  categoriesList = (fetchAPi) => {
    this.setState({ categoriaList: fetchAPi });
  }

  loading = () => (
    <div className="loading">
      <span>Loading</span>
      <i className="cart huge icon" />
    </div>
  )

  render() {
    const { categoriaList, productList, loading } = this.state;
    return (
      <div className="container pg-inicial">
        <section
          className="ui vertical text menu"
          style={ { overflow: 'auto', height: '90vh', padding: '2px' } }
        >
          <div className="header item">Categorias</div>
          { (categoriaList !== []) && this.categoryList() }
        </section>
        <section className="content">
          { this.searchBar() }
          { productList && productList.length < 1 && this.defaultText() }
          { loading ? this.loading() : this.productList()}
        </section>
      </div>
    );
  }
}
