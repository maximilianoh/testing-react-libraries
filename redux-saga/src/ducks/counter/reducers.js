import types from './types';
const INITIAL_STATE = {
    count: 0,
    history: [],
    data:[],
}
  
function handleChange(state, change) {
  const {count, history} = state;
  return ({
    ...state,
    count: count + change,
    history: [count + change, ...history],
  })
}

function apiChange(state, payload){
  return ({
    ...state,
    data: payload,
  })
}

export default function counter(state = INITIAL_STATE, action) {
    switch(action.type) {
      case types.INCREMENT:
        return handleChange(state, 1);
      case types.DECREMENT:
        return handleChange(state, -1);
      case types.RESET:
        return (INITIAL_STATE);
      case types.GET_TODOS:
        return apiChange(state, action.payload);
      default:
        return state;
    }
}
