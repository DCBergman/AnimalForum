import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(async() => {
  let response = await fetch("/api/login", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
   console.log(response);
   try {
     response = await response.json();
     setLoggedIn(true);
     console.log(response);
   } catch {
     console.log("Bad credentials");
   }
  },[])

  // const isLoggedIn = async () => {
  //    let response = await fetch("localhost:3000/api/login");
  //   console.log("login ", response);
  //   response = await response.json();
  //   console.log("login ", response);
  // }
  const logout = async () => {
    await fetch(
          "/api/login", 
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        setLoggedIn(false);
        history.push("/");
  } 
  function routeToHomepage(){
    history.push("/");
  } 
  function routeToLogin(){
    history.push("/login");
  } 
  function routeToRegister(){
    history.push("/register");
  } 

  return (
    <div className="header-div">
      <section className="header-title" onClick={routeToHomepage}>
        Animal Forum
      </section>
      <div className="header-right-aligned">
        {loggedIn ? (
          <section className="header-p" onClick={logout}>
            Logout   
          </section>
        ) : (
          <section className="header-p" onClick={routeToLogin}>
            Login
          </section>
        )}
        <section className="header-p" onClick={routeToRegister}>
          Register
        </section>
      </div>
    </div>
  );
};
export default Header;
