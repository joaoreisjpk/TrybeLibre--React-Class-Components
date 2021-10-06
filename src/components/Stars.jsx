import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Stars extends Component {
  render() {
    const { int, onClick } = this.props;
    return (
      <button
        id={ int }
        type="button"
        className="ui basic button bStar"
        onClick={ (e) => onClick(e) }
      >
        <i className="icon white star" />
      </button>
    );
  }
}

Stars.propTypes = {
  int: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
