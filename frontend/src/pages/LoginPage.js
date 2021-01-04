import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function attemptLogin(e){
    e.preventDefault();
     const credentials = {
       email,
       password
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
       history.push("/");
     } catch {
       console.log("Bad credentials");
     }
  }

  return (
    <div className="form-block">
      <form>
        <h1>Login</h1>
        <section className="form-section">
          <label className="block-label">Email</label>
          <br />
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            required
            className="inputFit"
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>

        <section className="form-section">
          <label className="block-label" type="password">
            Password
          </label>
          <br />
          <input
            id="password"
            type="password"
            name="new-password"
            autoComplete="off"
            aria-describedby="password-constraints"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

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