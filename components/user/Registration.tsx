import { useState } from "react";
import classNames from "classnames";
import { addCollectionItem } from "@/lib/CRUD/addCollectionItem";
import { Person, DocumentData } from "@/lib/dataTypes";

interface Props {
  userId: string;
  data: DocumentData | null;
  onClick: () => void;
}

const Registration: React.FC<Props> = ({ userId, data, onClick }) => {
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [lastNameError, setLastNameError] = useState(false);
  const [email, setEmail] = useState(data?.email || "");
  const [emailError, setEmailError] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    let valid = true;
    if (!firstName) {
      setFirstNameError(true);
      valid = false;
    }
    if (!lastName) {
      setLastNameError(true);
      valid = false;
    }
    if (!email) {
      setEmailError(true);
      valid = false;
    }
    if (!emailRegex.test(email)) {
      setEmailError(true);
      valid = false;
    }
    if (!valid) {
      return;
    }
    const params: Person = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    const newDocRef = await addCollectionItem("people", params, userId);
    if (newDocRef) {
      onClick();
    }
  };
  return (
    <article className="container">
      <form className="row center-xs" onSubmit={submitHandler}>
        <fieldset className="col-xs-11 col-sm-8 col-md-6">
          <h1>Toegang vragen</h1>
          <p>
            Je hebt pas toegang tot je persoonlijk dashboard wanneer je
            onderstaand formulier hebt ingevuld en één van de teachers jouw
            toegang heeft goedgekeurd.
          </p>
          <label>
            Voornaam{" "}
            <small
              className={classNames("error", "float-right", {
                show: firstNameError,
              })}
            >
              Vul je voornaam in.
            </small>
            <input
              autoComplete="off"
              className={classNames({ error: firstNameError })}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              placeholder="Voornaam"
              type="text"
            />
          </label>
          <label>
            Familienaam{" "}
            <small
              className={classNames("error", "float-right", {
                show: lastNameError,
              })}
            >
              Vul je familienaam in.
            </small>
            <input
              autoComplete="off"
              className={classNames({ error: lastNameError })}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Familienaam"
              type="text"
              value={lastName}
            />
          </label>
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
          <input type="submit" value="Aanmelden" />
        </fieldset>
      </form>
    </article>
  );
};

export default Registration;
