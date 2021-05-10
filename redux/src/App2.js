import Counter from './components/Counter';
import History from './components/History';
import './App.css';
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

function App() {
  return (
    <div className="App">
      <div style={styles}>
            <div>
              <Counter />
              <History />
            </div>
        </div>
    </div>
  );
}

export default App;
