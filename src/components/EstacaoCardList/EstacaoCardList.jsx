import EstacaoCard from "../EstacaoCard/EstacaoCard";
import { ESTACOES } from "../../data/estacoes";

export default function EstacaoCardList() {
  return (
    <>
      <h2>Lista de Estações</h2>
      <div>
        {ESTACOES.map((estacao) =>
          estacao.operando ? (
            <EstacaoCard key={estacao.id+"_card"} stationId={estacao.id}>{estacao.bairro}</EstacaoCard>
          ) : null
        )}
      </div>
    </>
  );
}