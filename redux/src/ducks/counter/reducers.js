import types from './types';
const INITIAL_STATE = {
    count: 0,
    history: [],
}
  
function handleChange(state, change) {
    const {count, history} = state;
    return ({
      count: count + change,
      history: [count + change, ...history]
    })
}

export default function counter(state = INITIAL_STATE, action) {
    switch(action.type) {
      case types.INCREMENT:
        return handleChange(state, 1);
      case types.DECREMENT:
        return handleChange(state, -1);
      case types.RESET:
        return (INITIAL_STATE)
      default:
        return state;
    }
}
