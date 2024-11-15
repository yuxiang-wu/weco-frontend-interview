import logo from './logo.svg';
import './App.css';
import LLMDataTable from './LLMDataTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>LLM Data Table</h1>
        <LLMDataTable />
      </header>
    </div>
  );
}

export default App;
