import React, { useContext, useEffect, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Header = (props) => {
  const forumContext = useContext(ForumContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const history = useHistory();

  useEffect(() => {
  
  setLoggedIn(forumContext.isLoggedIn);
  getUserRole();
   
  },[forumContext.isLoggedIn])

  // const isLoggedIn = async () => {
  //    let response = await fetch("localhost:3000/api/login");
  //   console.log("login ", response);
  //   response = await response.json();
  //   console.log("login ", response);
  // }
  const getUserRole = async () => {
    let user = await forumContext.fetchLoggedInUser();
    if(user !== null){
      setRole(user.userRole);
    }else{
      setLoggedIn(false);
    }
  }
  const logout = async () => {
    await fetch(
          "/api/login", 
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        forumContext.setIsLoggedIn(false);
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
  function routeToAdmin() {
    history.push("/admin");
  } 
  function SwitchCase(props){
    switch(props.role){
      case "basicUser":
        return "";
      case "admin":
        return (
          <section className="header-p" onClick={routeToAdmin}>
            Admin
          </section>
        );
      case "moderator":
        return (
          <section className="header-p" >
            My Forums
          </section>
        );
        default:
          return"";
    
    }

  }
  return (
    <div className="header-div">
      <section className="header-title" onClick={routeToHomepage}>
        Animal Forum
      </section>
      {loggedIn ? (
        <div className="header-right-aligned">
          <SwitchCase role={role} />
          <section className="header-p" onClick={logout}>Logout</section>
        </div>
      ) : (
        <div className="header-right-aligned">
          <section className="header-p" onClick={routeToLogin}>
            Login
          </section>

          <section className="header-p" onClick={routeToRegister}>
            Register
          </section>
        </div>
      )}
    </div>
  );
};
export default Header;
