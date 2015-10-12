/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoSotre
 */
/* @flow */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param {string} text The content of the TODO
 */
function create(text:string) {
  // hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param {string} id
 * @param {object} updates An object literal containing only the data to be update.
 */
function update(id:string, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param {object} updates An object literal containing only the data to be update.
 */
function updateAll(updates) {
  for (let ind in _todos) {
    update(id, updates);
  }
}

/**
 * delete a TODO item.
 * @param {string} id
 */
function destroy(id:string) {
  delete _todos[id];
}

/**
 * delete all the completed TODO items.
 */
function destroyCompleted() {
  for (let id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete() {
    for (let id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll() {
    return _todos;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updateds
AppDispatcher.register(action => {
  var text;

  switch (action.actionType) {
  case TodoConstants.TODO_CREATE:
    text = action.text.trim();
    if (text !== '') {
      create(text);
      TodoStore.emitChange();
    }
    break;

  case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
    if (TodoStore.areAllComplete()) {
      updateAll({complete: false});
    } else {
      updateAll({complete: true});
    }
    TodoStore.emitChange();
    break;

  case TodoConstants.TODO_UNDO_COMPLETE:
    update(action.id, {complete: false});
    TodoStore.emitChange();
    break;

  case TodoConstants.TODO_COMPLETE:
    update(action.id, {complete: true});
    TodoStore.emitChange();
    break;

  case TodoConstants.TODO_UPDATE_TEXT:
    text = action.text.trim();
    if (text !== '') {
      update(action.id, {text: text});
      TodoStore.emitChange();
    }
    break;

  case TodoConstants.TODO_DESTROY:
    destroy(action.id);
    TodoStore.emitChange();
    break;

  case TodoConstants.TODO_DESTROY_COMPLETED:
    destroyCompleted();
    TodoStore.emitChange();
    break;
  default:
    // no op
  }
});

module.exports = TodoStore;
