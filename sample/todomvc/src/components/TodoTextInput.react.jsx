/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoTextInput
 */
/* @flow */
var React = require('react');
var ReactpropTypes = React.PropTypes;

const ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({

  PropTypes: {
    className: ReactpropTypes.string,
    id: ReactpropTypes.string,
    placeholder: ReactpropTypes.string,
    onSave: ReactpropTypes.func.isRequired,
    value: ReactpropTypes.string,
  },

  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({ value: '' });
  },

  /**
   * @param {object} event
   */
  _onChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
});

module.exports = TodoTextInput;
