import "../assets/styles/Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <h1 className="navbar">WildSeries </h1>
      <ul className="titles">
        <li>Categories</li>
        <li>Favoris</li>
        <li>Sorties recentes</li>
      </ul>
    </nav>
  );
};

export default Navigation;
