import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import EstacaoMenu from "./components/EstacaoMenu/EstacaoMenu";
import EstacaoCardList from "./components/EstacaoCardList/EstacaoCardList";
import EstacaoCard from "./components/EstacaoCard/EstacaoCard";
import { catalogoEstacoes } from "./data/estacoes";

function App() {
  const [estacaoSelecionadaInfo, setEstacaoSelecionadaInfo] = useState(null);
  function estacaoSelecionada(infoEstacao) {
    setEstacaoSelecionadaInfo(infoEstacao);
  }

  return (
    <>
      <Header />
      <EstacaoMenu estacaoSelecionada={estacaoSelecionada} />
      <EstacaoCard
        stationId={
          estacaoSelecionadaInfo
            ? estacaoSelecionadaInfo.id
            : catalogoEstacoes.getPrimeiraEstacaoAtiva().id
        }
      >
        {estacaoSelecionadaInfo
          ? estacaoSelecionadaInfo.bairro
          : catalogoEstacoes.getPrimeiraEstacaoAtiva().bairro}
      </EstacaoCard>
    </>
  );
}

export default App;
