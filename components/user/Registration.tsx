import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { checkIsValidEmail } from "@/lib/helpers";
import type { User } from "@prisma/client";
import type { AriaInvalid } from "@/lib/dataTypes";

type props = { userData: Partial<User>; setPending: () => void };

const Registration: React.FC<props> = ({ userData, setPending }) => {
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [firstNameError, setFirstNameError] = useState<AriaInvalid>(undefined);
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [lastNameError, setLastNameError] = useState<AriaInvalid>(undefined);
  const [emailInput, setEmailInput] = useState(userData.emailInput || "");
  const [emailInputError, setEmailInputError] =
    useState<AriaInvalid>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  if (
    emailInput.length < 5 &&
    userData.email &&
    checkIsValidEmail(userData.email)
  ) {
    setEmailInput(userData.email);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setFirstNameError(false);
    setLastNameError(false);
    setEmailInputError(false);
    let valid = true;

    if (!firstName) {
      setFirstNameError(true);
      valid = false;
    }
    if (!lastName) {
      setLastNameError(true);
      valid = false;
    }
    if (!emailInput) {
      setEmailInputError(true);
      valid = false;
    }
    const isValidEmail = checkIsValidEmail(emailInput);
    if (!isValidEmail) {
      setEmailInputError(true);
      valid = false;
    }
    if (valid) {
      axios
        .post("/api/user", {
          firstName,
          lastName,
          emailInput,
        })
        .then(() => {
          setPending();
          setIsLoading(false);
        });
    }
  };
  return (
    <article className="container mt1">
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
              aria-invalid={firstNameError}
              autoComplete="off"
              disabled={isLoading}
              value={firstName}
              onChange={(e) => (
                setFirstName(e.target.value), setFirstNameError(undefined)
              )}
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
              aria-invalid={lastNameError}
              autoComplete="off"
              disabled={isLoading}
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value), setLastNameError(undefined);
              }}
              placeholder="Familienaam"
              type="text"
              value={lastName}
            />
          </label>
          <label>
            E-mail
            <small
              className={classNames("error", "float-right", {
                show: emailInputError,
              })}
            >
              Vul een geldig e-mailadres in.
            </small>
            <input
              aria-invalid={emailInputError}
              autoComplete="off"
              disabled={isLoading}
              name="emailInput"
              onChange={(e) => {
                setEmailInput(e.target.value), setEmailInputError(undefined);
              }}
              placeholder="E-mail"
              type="text"
              value={emailInput}
            />
          </label>
          <button
            aria-busy={isLoading}
            disabled={isLoading || !firstName || !lastName || !emailInput}
            type="submit"
            value="Aanmelden"
          >
            Aanmelden
          </button>
        </fieldset>
      </form>
    </article>
  );
};

export default Registration;
