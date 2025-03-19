import logo from './logo.svg';
import './App.css';
import Funcompo from "./components/funcompo"
import Funcprop from "./props/funcprop"
import Funcstate from "./state/funcstate"
import Funcform from "./forms/funcform"
import Funceve from "./events/funceve"

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Funcompo/>
        <Funcprop name="moon" />
        <Funcstate/>
        <Funcform/>
        <Funceve/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
