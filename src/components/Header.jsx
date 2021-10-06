import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="row container">
          <div className="container">
            <Link to="../" className="header-link">
              <img className="logo" src={ logo } alt="trybe logo" />
            </Link>
          </div>
          <section className="header container">
            <Link to="../" className="header-link">
              <h1 className="header-title">Trybe-Libre</h1>
            </Link>
          </section>
        </div>
      </header>
    );
  }
}
