import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const LoginPage = (props) => {
  const forumContext = useContext(ForumContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  async function attemptLogin(e) {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };

    let response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    console.log(response);
    try {
      response = await response.json();
      console.log(response);
      if (response !== null) {
        forumContext.setIsLoggedIn(true);
        history.push("/");
      } else {
        setAlert(true);
      }
    } catch {
      console.log("Bad credentials");
    }
  }

  return (
    <div className="form-block">
      <form classname="form">
        <h1>Login</h1>
        <section className="form-section">
          <label className="block-label">Email</label>
          <br />
          <input
            classname="email"
            type="email"
            name="email"
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>

        <section className="form-section">
          <label className="block-label" type="password">
            Password
          </label>
          <br />
          <input
            classname="password"
            type="password"
            name="new-password"
            autoComplete="off"
            aria-describedby="password-constraints"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        {alert ? (
          <Alert color="danger">
            Incorrect email and password combination!
          </Alert>
        ) : (
          ""
        )}
        <div className="btn-div">
          <button classname="form-button" onClick={attemptLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
