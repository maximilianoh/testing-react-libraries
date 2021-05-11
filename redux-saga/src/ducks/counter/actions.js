import types from './types';

const actions = {
    increase: () => ({ type: types.INCREMENT}),
    decrease: () => ({ type: types.DECREMENT}),
    reset: () => ({ type: types.RESET})
  };
  
export default actions;