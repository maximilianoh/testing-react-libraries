import {useState } from 'react'
import './App.css';
import Counter from './components/Counter';
import History from './components/History';
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

function App() {
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);

  return (
    <div className="App">
      <div style={styles}>
          <div>
            <Counter counter={counter} setCounter={setCounter} setHistory={setHistory} />
            <History history={history} />
          </div>
      </div>
    </div>
  );
}

export default App;
