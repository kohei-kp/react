var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

// Define initial data points
var _product = {}, _selected = null;

// Method to load product data from mock API
function loadProductData(data) {
  _product = data[0];
  _selected = data[0].variants[0];
}

// Method to set the currently selected product variation
function setSelected(index) {
  _selected = _product.variants[index];
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = _.exnted({}, EventEmitter.prototype, {

  // Return Product data
  getProduct() {
    return _product;
  },

  // return selected Product
  getSelected() {
    return _selected;
  },

  // Emit Change event
  emitChange() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  var action = payload.action;
  var text;

  switch (action.actionType) {

    // Respond to RECEIVE_DATA action
  case FluxCartConstants.RECEIVE_DATA:
    loadProductData(action.data);
    break;

  // Respond to SET_SELECTED action
  case FluxCartConstants.SELECT_PRODUCT:
    setSelected(action.data);
    break;

  default:
    return true;
  }
});

module.exports = ProductStore;
