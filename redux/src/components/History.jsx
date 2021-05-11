import { useSelector } from 'react-redux';

function History() {
  const history = useSelector(state => state.counterGroup.history);
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