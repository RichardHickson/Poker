import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  RouteProps,
} from "react-router-dom";
import Home from "./components/Home";
import PokerLedger from "./components/PokerLedger";
import PastGames from "./components/PastGames";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poker-ledger" element={<PokerLedger />} />
        <Route path="/past-games" element={<PastGames />} />
      </Routes>
    </Router>
  );
};

export default App;
