import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { categoria, onClick } = this.props;
    return (
      <div className="item">
        <button
          type
          className="ui blue basic button"
          onClick={ () => onClick(categoria.id) }
          style={{padding: '8px', margin: '-4px 0'}}
        >
          { categoria.name }
        </button>
      </div>
    );
  }
}

Categories.propTypes = {
  categoria: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
