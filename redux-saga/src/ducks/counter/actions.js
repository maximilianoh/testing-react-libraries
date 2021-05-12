import types from './types';

const actions = {
    increase: () => ({ type: types.INCREMENT}),
    decrease: () => ({ type: types.DECREMENT}),
    reset: () => ({ type: types.RESET}),
    getData: () => ({ type: types.GET_TODOS_REQUESTED}),
  };
  
export default actions;