import EstacaoBotao from "../EstacaoBotao/EstacaoBotao";
import { ESTACOES } from "../../data/estacoes";
import "./EstacaoMenu.css";

export default function EstacaoMenu() {
  return (
    <>
      <h2>Selecione uma Estação</h2>
      <menu>
        {ESTACOES.map((estacao) =>
          estacao.operando ? (
            <EstacaoBotao key={estacao.id}>{estacao.bairro}</EstacaoBotao>
          ) : null,
        )}
      </menu>
    </>
  );
}
