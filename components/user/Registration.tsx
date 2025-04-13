import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { checkIsValidEmail } from "@/lib/helpers";
import type { User } from "@prisma/client";
import type { AriaInvalid } from "@/lib/dataTypes";

type props = {
  userData?: Partial<User>;
  setShowRegistration: Dispatch<SetStateAction<boolean>>;
};

const Registration: React.FC<props> = ({ userData, setShowRegistration }) => {
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [firstNameError, setFirstNameError] = useState<AriaInvalid>(undefined);
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [lastNameError, setLastNameError] = useState<AriaInvalid>(undefined);
  const [email, setemail] = useState(userData?.email || "");
  const [emailError, setemailError] = useState<AriaInvalid>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setFirstNameError(false);
    setLastNameError(false);
    setemailError(false);
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
      setemailError(true);
      valid = false;
    }
    const isValidEmail = checkIsValidEmail(email);
    if (!isValidEmail) {
      setemailError(true);
      valid = false;
    }
    if (valid) {
      axios
        .post("/api/user", {
          firstName,
          lastName,
          email,
        })
        .then(() => {
          setIsLoading(false);
          setShowRegistration(false);
        });
    } else {
      setIsLoading(false);
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
                show: emailError,
              })}
            >
              Vul een geldig e-mailadres in.
            </small>
            <input
              aria-invalid={emailError}
              autoComplete="off"
              disabled={isLoading}
              name="email"
              onChange={(e) => {
                setemail(e.target.value), setemailError(undefined);
              }}
              placeholder="E-mail"
              type="text"
              value={email}
            />
          </label>
          <button
            aria-busy={isLoading}
            disabled={isLoading || !firstName || !lastName || !email}
            type="submit"
            value="Toegang vragen"
          >
            Toegang vragen
          </button>
        </fieldset>
      </form>
    </article>
  );
};

export default Registration;
