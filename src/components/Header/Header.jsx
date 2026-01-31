import "./Header.css";

export default function Header({ menuSelecionado, selecionarMenu }) {
  return (
    <header className="header-app">
      <h1 className="titulo-app">Índice de Calor em Macaé/Rj </h1>
      <nav className="menu-navegacao">
        <button onClick={() => selecionarMenu("inicio")} disabled={menuSelecionado === "inicio"}>Início</button>
        <button onClick={() => selecionarMenu("estacoes")} disabled={menuSelecionado === "estacoes"}>Estações</button>
        <button onClick={() => selecionarMenu("sobre")} disabled={menuSelecionado === "sobre"}>Sobre</button>
      </nav>
    </header>
  );
}