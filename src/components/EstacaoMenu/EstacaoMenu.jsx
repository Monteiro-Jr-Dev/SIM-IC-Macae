import EstacaoBotao from "../EstacaoBotao/EstacaoBotao";
import { catalogoEstacoes } from "../../data/estacoes";
import "./EstacaoMenu.css";

export default function EstacaoMenu() {
  return (
    <>
      <h2>Selecione uma Estação</h2>
      <menu>
        {catalogoEstacoes.getEstacoesAtivas().map((estacao) =>
            <EstacaoBotao key={estacao.id}>{estacao.bairro}</EstacaoBotao>
        )}
      </menu>
    </>
  );
}
