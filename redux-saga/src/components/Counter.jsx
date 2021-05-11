import { useDispatch, useSelector } from 'react-redux';
import { counterGroup } from '../ducks/';

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(counterGroup.selectors.getCount);
  return (
    <div> 
        <h1> Counter </h1>
        <h1> {counter} </h1>
        <button onClick={() => dispatch(counterGroup.actions.increase())}> Increase </button>
        <button onClick={() => dispatch(counterGroup.actions.decrease())}> Decrease </button>
        <button onClick={() => dispatch(counterGroup.actions.reset())}> Reset </button>
    </div>
  );
}

export default App;