import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as ServiceGroups from '../ducks';
import rootSaga from '../ducks/counter/sagas';
// Se arma el objeto con todos los reducers { ExampleServiceGroup: reducer, ... }
const reducers = Object.fromEntries(
    Object.entries(ServiceGroups)
      .map(([key, value]) => ([
        key, value.reducer
      ]))
);

// Se arma el array con todos los sagas
/*const sagas = Object.entries(ServiceGroups)
  .reduce((acc, [, value]) => acc.concat(...value.sagas), []);*/
 

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers(reducers);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga)

export default store;