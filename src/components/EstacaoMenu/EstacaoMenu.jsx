import EstacaoBotao from "../EstacaoBotao/EstacaoBotao";
import { ESTACOES } from "../../data/data";
import "./EstacaoMenu.css";

export default function EstacaoMenu(){
    return (
    <menu>
        {ESTACOES.map(estacao => estacao.operando ?
            <EstacaoBotao key={estacao.id}>{estacao.bairro}</EstacaoBotao>
         : null)}
    </menu>);
}