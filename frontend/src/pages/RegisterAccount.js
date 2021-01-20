import React, { useState } from "react";
import { Alert } from "reactstrap";
import "../index.css";

const RegisterAccount = (props) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const [password2, setPassword2] = useState([]);
   const [visible, setVisible] = useState(false);


  const onDismiss = () => setVisible(false);

  async function createAccount(e) {
    e.preventDefault();

    let userRole = "basicUser";
    if (password === password2) {
      const credentials = {
        email,
        username,
        password,
        userRole,
      };

      let response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      try {
        response = await response.json();
        console.log(response);
        setEmail("");
        setPassword("");
        setUsername("");
        setPassword2("");
        setVisible(true);
      } catch {
        console.log("Bad credentials");
      }
    } else {
      console.log("passwords don't match");
    }
  }

  return (
    <div className="register-div">
      {visible ? (
        <Alert
          color="info"
          className="register-alert"
          isOpen={visible}
          toggle={onDismiss}
        >
          <h4 className="alert-heading">Grattis!</h4>
          <p>
            Ditt konto har blivit registrerat! 
            <br/>För att logga in med dina uppgifter klicka på Login i huvudmenyn.
          </p>
        </Alert>
      ) : (
        <div className="form-block">
          <form>
            <h1>Register</h1>
            <section className="form-section">
              <label className="block-label">Email</label>
              <br />
              <input
                classname="email"
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section className="form-section">
              <label className="block-label">Username</label>
              <br />
              <input
                classname="username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
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
                aria-describedby="password-constraints"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>

            <section className="form-section">
              <label className="block-label">Confirm password</label>
              <br />
              <input
                className="confirmPassword"
                type="password"
                name="new-password"
                required
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
      )}
    </div>
  );
};
export default RegisterAccount;
