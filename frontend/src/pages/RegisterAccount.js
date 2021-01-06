import React, { useContext, useEffect, useState } from "react";
import "../index.css";


const RegisterAccount = (props) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const [password2, setPassword2] = useState([]);

  async function createAccount(e){
    e.preventDefault();

     let userRole = "basicUser";
    if(password === password2){
      const credentials = {
        email,
        username,
        password,
        userRole
      };

        let response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        try {
          response = await response.json();
          console.log(response);
          //setUser(response)
         // props.history.push("/");
        } catch {
          console.log("Bad credentials");
        }
    }
    else{
      console.log("passwords don't match");
    }
  }

  return (
    <div className="form-block">
      <form>
        <h1>Register</h1>
        <section className="form-section">
          <label className="block-label">
            Email
          </label>
          <br />
          <input
            id="email"
            type="email"
            name="email"
            autoFocus
            required
            className="inputFit"
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>

        <section className="form-section">
          <label className="block-label">
            Username
          </label>
          <br />
          <input
            id="username"
            name="username"
            required
            className="inputFit"
            onChange={(e) => setUsername(e.target.value)}
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
            aria-describedby="password-constraints"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        <section className="form-section">
          <label className="block-label">
            Confirm password
          </label>
          <br />
          <input
            id="confirmPassword"
            type="password"
            name="new-password"
            required
            className="inputFit"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </section>
        <div className="btn-div">
          <button classname="form-button" onClick={createAccount}>
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterAccount; 