import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container">
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive ? "navbar-brand active" : "navbar-brand"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/poker-ledger"
          className={(navData) =>
            navData.isActive ? "nav-link active" : "nav-link"
          }
        >
          Poker Ledger
        </NavLink>
        <NavLink
          to="/past-games"
          className={(navData) =>
            navData.isActive ? "nav-link active" : "nav-link"
          }
        >
          Past Games
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
