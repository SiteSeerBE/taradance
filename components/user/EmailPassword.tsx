import classNames from "classnames";
import { useState } from "react";

const EmailPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  return (
    <form>
      <fieldset>
        <label>
          E-mail
          <small
            className={classNames("error", "float-right", {
              show: emailError,
            })}
          >
            Vul een geldig e-mailadres in.
          </small>
          <input
            autoComplete="off"
            className={classNames({ error: emailError })}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="text"
            value={email}
          />
        </label>
        <label>
          Wachtwoord
          <small
            className={classNames("error", "float-right", {
              show: passwordError,
            })}
          >
            Vul een wachtwoord in.
          </small>
          <input
            autoComplete="off"
            className={classNames({ error: passwordError })}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            type="password"
            value={password}
          />
        </label>
        <input type="submit" value="Aanmelden" />
      </fieldset>
      <p>
        Nog geen account? <a>Account maken</a>
      </p>
    </form>
  );
};

export default EmailPassword;
