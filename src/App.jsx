import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import EstacaoMenu from "./components/EstacaoMenu/EstacaoMenu";
import { API_KEY } from "./services/apiConfig";
import { ESTACOES } from "./data/estacoes";
import EstacaoCardList from "./components/EstacaoCardList/EstacaoCardList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <EstacaoMenu />
      <EstacaoCardList />
    </>
  );
}

export default App;
