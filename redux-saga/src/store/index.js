import { createStore, combineReducers } from 'redux';
import * as ServiceGroups from '../ducks';
// Se arma el objeto con todos los reducers { ExampleServiceGroup: reducer, ... }
const reducers = Object.fromEntries(
    Object.entries(ServiceGroups)
      .map(([key, value]) => ([
        key, value.reducer
      ]))
);
console.dir(reducers);
/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers(reducers);

let store = createStore(rootReducer)
export default store;