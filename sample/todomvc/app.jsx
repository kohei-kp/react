/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * App
 */
var React = require('react');
var ReactDOM = require('react-dom');
var TodoApp = require('./src/components/TodoApp.react.jsx');

var App = React.createClass({
  render() {
    return (
      <TodoApp/>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
