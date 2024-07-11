import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "../components/SignOutButton";

function HomePage() {
  const { isLoggedIn } = useAppContext();
  return (
    <header>
      <p>This Is Home Page</p>
      {isLoggedIn ? (
        <>
          <Link to={"/my-bookings"}>My Bookings</Link>
          <Link to={"/my-hotels"}>My Hotels</Link>
          <SignOutButton />
        </>
      ) : (
        <Link to={"/login"}>Sign In</Link>
      )}
    </header>
  );
}

export default HomePage;
