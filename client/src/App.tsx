import "./App.css";
import { Outlet } from "react-router";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
