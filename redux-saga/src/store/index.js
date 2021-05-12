import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as ServiceGroups from '../ducks';
import { all } from 'redux-saga/effects';
// Se arma el objeto con todos los reducers { xxxServiceGroup: reducer, ... }
const reducers = Object.fromEntries(
    Object.entries(ServiceGroups)
      .map(([key, value]) => ([
        key, value.reducer
      ]))
);

// Se arma el array con todos los sagas
const sagas = Object.entries(ServiceGroups)
  .reduce((acc, [, value]) => acc.concat(...value.sagas), []);
 
const rootSaga = function* root() {
    yield all(sagas);
};
/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers(reducers);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga)

export default store;