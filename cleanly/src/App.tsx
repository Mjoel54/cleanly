import { Outlet } from "react-router-dom";
import "./App.css";
import NavPanel from "./components/NavPanel.js";

function App() {
  return (
    <>
      <NavPanel />
      <main className="py-10 lg:pl-72 bg-slate-50 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
