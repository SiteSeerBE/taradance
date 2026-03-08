"use client";

import classNames from "classnames";
import { useState } from "react";
import { AriaInvalid } from "@/lib/dataTypes";
import axios from "axios";

const Inschrijven = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameHasError, setFirstNameHasError] =
    useState<AriaInvalid>(undefined);

  const [lastName, setLastName] = useState("");
  const [lastNameHasError, setLastNameHasError] =
    useState<AriaInvalid>(undefined);
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState<AriaInvalid>(undefined);
  const [phone, setPhone] = useState("");
  const [phoneHasError, setPhoneHasError] = useState<AriaInvalid>(undefined);
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setIsWaiting(true);

    setFirstNameHasError(false);
    setLastNameHasError(false);
    setEmailHasError(false);
    setPhoneHasError(false);

    let isValid = true;

    const fields = [
      { value: firstName, setError: setFirstNameHasError },
      { value: lastName, setError: setLastNameHasError },
      { value: email, setError: setEmailHasError },
      { value: phone, setError: setPhoneHasError },
    ];

    fields.forEach(({ value, setError }) => {
      if (!value) {
        setError(true);
        isValid = false;
      }
    });

    if (isValid) {
      axios.post("/api/send", {
        firstName,
        lastName,
        email,
        phone,
        experience,
        message,
      });
      setIsSuccess(true);
      setIsWaiting(false);
    }
    setIsWaiting(false);
    return;
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setExperience("");
    setMessage("");
    setIsSuccess(false);
    //  also emply form

    const form = document.querySelector("form");
    if (form) {
      form.reset();
    }
  };

  return (
    <>
      <div className="container mt1">
        <article>
          <header>
            <h1>Inschrijven</h1>
            <p>
              Wil je graag een dansles volgen bij Taradance? Schrijf je dan in
              via het onderstaande formulier. We nemen zo snel mogelijk contact
              met je op om de details te bespreken.
            </p>
          </header>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">
                Voornaam*:
                <small
                  className={classNames("error", "float-right", {
                    show: firstNameHasError,
                  })}
                >
                  Vul je voornaam in.
                </small>
              </label>
              <input
                aria-invalid={firstNameHasError}
                id="firstName"
                name="firstName"
                onChange={(e) => (
                  setFirstName(e.target.value.trim()),
                  setFirstNameHasError(undefined),
                  setIsWaiting(false)
                )}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                Familienaam*:
                <small
                  className={classNames("error", "float-right", {
                    show: lastNameHasError,
                  })}
                >
                  Vul je familienaam in.
                </small>
              </label>
              <input
                aria-invalid={lastNameHasError}
                id="lastName"
                name="lastName"
                onChange={(e) => (
                  setLastName(e.target.value.trim()),
                  setLastNameHasError(undefined),
                  setIsWaiting(false)
                )}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                E-mailadres*:
                <small
                  className={classNames("error", "float-right", {
                    show: emailHasError,
                  })}
                >
                  Vul je e-mailadres in.
                </small>
              </label>
              <input
                aria-invalid={emailHasError}
                id="email"
                name="email"
                onChange={(e) => (
                  setEmail(e.target.value.trim()),
                  setEmailHasError(undefined),
                  setIsWaiting(false)
                )}
                type="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Telefoonnummer*
                <small
                  className={classNames("error", "float-right", {
                    show: phoneHasError,
                  })}
                >
                  Vul je telefoonnummer in.
                </small>
              </label>
              <input
                aria-invalid={phoneHasError}
                id="phone"
                name="phone"
                onChange={(e) => (
                  setPhone(e.target.value.trim()),
                  setPhoneHasError(undefined),
                  setIsWaiting(false)
                )}
                type="tel"
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Heb je al danservaring?</label>
              <input
                id="experience"
                name="experience"
                onChange={(e) => setExperience(e.target.value.trim())}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                Moeten we nog iets belangrijks weten?
              </label>
              <textarea
                id="message"
                name="message"
                onChange={(e) => setMessage(e.target.value.trim())}
                rows={4}
              ></textarea>
            </div>
          </form>

          {isSuccess ? (
            <footer className="row">
              <p className="col-sm-7 col-md-8 col-lg-9">
                Bedankt voor je inschrijving! We nemen zo snel mogelijk contact
                met je op.
              </p>
              <button
                className="col-sm-5 col-md-4 col-lg-3 secondary"
                type="submit"
                onClick={handleReset}
              >
                Leeg maken
              </button>
            </footer>
          ) : (
            <footer>
              <button
                className="col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8 col-lg-3 col-lg-offset-9"
                aria-busy={isWaiting}
                disabled={isWaiting}
                onClick={handleSubmit}
                type="submit"
              >
                Inschrijven
              </button>
            </footer>
          )}
        </article>
      </div>
    </>
  );
};

export default Inschrijven;
