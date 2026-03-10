"use client";

import classNames from "classnames";
import { useState } from "react";
import { AriaInvalid } from "@/lib/dataTypes";
import axios from "axios";

const BoekOns = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameHasError, setFirstNameHasError] =
    useState<AriaInvalid>(undefined);

  const [lastName, setLastName] = useState("");
  const [lastNameHasError, setLastNameHasError] =
    useState<AriaInvalid>(undefined);
  const [organization, setOrganization] = useState("");
  const [organizationHasError, setOrganizationHasError] =
    useState<AriaInvalid>(undefined);
  const [eventDate, setEventDate] = useState("");
  const [eventDateHasError, setEventDateHasError] =
    useState<AriaInvalid>(undefined);
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState<AriaInvalid>(undefined);
  const [phone, setPhone] = useState("");
  const [phoneHasError, setPhoneHasError] = useState<AriaInvalid>(undefined);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setIsWaiting(true);

    setFirstNameHasError(false);
    setLastNameHasError(false);
    setEventDateHasError(false);
    setEmailHasError(false);
    setPhoneHasError(false);

    let isValid = true;

    const fields = [
      { id: "firstName", value: firstName, setError: setFirstNameHasError },
      { id: "lastName", value: lastName, setError: setLastNameHasError },
      { id: "email", value: email, setError: setEmailHasError },
      { id: "phone", value: phone, setError: setPhoneHasError },
      { id: "eventDate", value: eventDate, setError: setEventDateHasError },
    ];

    let firstInvalidFieldId: string | null = null;

    fields.forEach(({ id, value, setError }) => {
      if (!value) {
        setError(true);
        if (!firstInvalidFieldId) {
          firstInvalidFieldId = id;
        }
        isValid = false;
      }
    });

    if (isValid) {
      axios.post("/api/send/inschrijven", {
        firstName,
        lastName,
        organization,
        email,
        phone,
        eventDate,
        message,
      });
      setIsSuccess(true);
      setIsWaiting(false);
    } else {
      if (firstInvalidFieldId) {
        const firstInvalidField = document.getElementById(firstInvalidFieldId);
        firstInvalidField?.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalidField?.focus();
      }
    }
    setIsWaiting(false);
    return;
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setEventDate("");
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
            <h1>Boek ons</h1>
            <p>
                Wil je ons boeken voor een event, workshop of iets anders? Vul dan onderstaand formulier in en we nemen zo snel mogelijk contact met je op!
            </p>
          </header>
          <form>
            <div className="grid">
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
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organisatie*:</label>
              <input
                id="organization"
                name="organization"
                onChange={(e) => (
                  setOrganization(e.target.value.trim()),
                  setOrganizationHasError(undefined),
                  setIsWaiting(false)
                )}
                type="text"
              />
            </div>
            <div className="grid">
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
                Telefoonnummer*:
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
            </div>
            <div className="form-group">
                <label htmlFor="eventDate">Datum event*:
                <small
                    className={classNames("error", "float-right", {
                    show: eventDateHasError,
                    })}
                >
                    Vul de datum van het event in.
                </small>
                </label>
                <input
                aria-invalid={eventDateHasError}
                id="eventDate"
                name="eventDate"
                onChange={(e) => (
                    setEventDate(e.target.value.trim()),
                    setEventDateHasError(undefined),
                    setIsWaiting(false)
                )}
                type="date"
                />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                Wat kunnen we voor je doen?
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
                Bedankt voor je interesse! We nemen zo snel mogelijk contact met je op.
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
                Versturen
              </button>
            </footer>
          )}
        </article>
      </div>
    </>
  );
};

export default BoekOns;
