import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function HomePage() {
  const { isLoggedIn } = useAppContext();
  return (
    <header>
      <p>This Is Home Page</p>
      {isLoggedIn ? (
        <Link to={"/login"}>Sign Out</Link>
      ) : (
        <Link to={"/login"}>Sign In</Link>
      )}
    </header>
  );
}

export default HomePage;
