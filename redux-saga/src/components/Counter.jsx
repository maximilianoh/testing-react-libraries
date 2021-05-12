import { useDispatch, useSelector } from 'react-redux';
import { counterGroup } from '../ducks/';

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector(counterGroup.selectors.getCount);
  const list = useSelector(counterGroup.selectors.getSize);
  return (
    <div> 
        <h1> Counter </h1>
        <h1> Size list: {list} </h1>
        <h1> {counter} </h1>
        <button onClick={() => dispatch(counterGroup.actions.increase())}> Increase </button>
        <button onClick={() => dispatch(counterGroup.actions.decrease())}> Decrease </button>
        <button onClick={() => dispatch(counterGroup.actions.reset())}> Reset </button>
        <button onClick={() => dispatch(counterGroup.actions.getData())}> Get </button>
    </div>
  );
}

export default Counter;