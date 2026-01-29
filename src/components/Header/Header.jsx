export default function Header({ menuSelecionado, selecionarMenu }) {
  return (
    <header>
      <h1>Índice de Calor em Macaé/RJ</h1>
      <nav>
        <button onClick={() => selecionarMenu("inicio")} disabled={menuSelecionado === "inicio"}>Início</button>
        <button onClick={() => selecionarMenu("estacoes")} disabled={menuSelecionado === "estacoes"}>Estações</button>
        <button onClick={() => selecionarMenu("sobre")} disabled={menuSelecionado === "sobre"}>Sobre</button>
      </nav>
    </header>
  );
}