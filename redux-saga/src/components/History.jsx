import { useSelector } from 'react-redux';
import { counterGroup } from '../ducks/';

function History() {
  const history = useSelector(counterGroup.selectors.getHistory);
  return (
    <div> 
        <h1> History </h1>
        <ul>
          {history.map((item, index) => (<li key={index}> {item} </li>))}
        </ul>
      </div>
  );
}
export default History;