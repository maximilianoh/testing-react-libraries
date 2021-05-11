function Counter({counter, setCounter, setHistory}) {
  return (
    <div> 
        <h1> Counter </h1>
        <h1> {counter} </h1>
        <button onClick={() => {
          const c = counter+1;
          setCounter( c );
          setHistory(state => ([c, ...state]));}}> 
            Increase 
        </button>
        <button onClick={() => {
          const c = counter-1;
          setCounter( c );
          setHistory(state => ([c, ...state]));}}> 
            Decrease 
        </button>
        <button onClick={() => {
          setCounter(0);
          setHistory([]);}}> 
            Reset 
        </button>
    </div>
  );
}

export default Counter;