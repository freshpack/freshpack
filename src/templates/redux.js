/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

// Dependencies

const dependenciesRedux = [
  'redux',
  'react-redux',
  'redux-thunk'
];

const devDependenciesTestRedux = [
  'redux-mock-store'
];

// File templates

const storeJs = `
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducers as app } from './components/app/state';

const store = createStore(combineReducers({ app }), {}, applyMiddleware(thunk));
export default store;
`;

module.exports = {
  dependenciesRedux,
  devDependenciesTestRedux,
  storeJs
};
