"use client";

import { useState } from "react";
import classNames from "classnames";
import type { AriaInvalid } from "@/lib/dataTypes";

export default function Inschrijven({}) {
  // content
  const [voornaam, setVoornaam] = useState<string>("");
  const [achternaam, setAchternaam] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [geboortedatum, setGeboortedatum] = useState<Date>(new Date());
  const [adres, setAdres] = useState<string>("");
  const [telefoonnummer, setTelefoonnummer] = useState<string>("");
  const [ervaring, setErvaring] = useState<string>("");
  const [opmerking, setOpmerking] = useState<string>("");

  //error handeling
  const [voornaamHasError, setVoornaamHasError] =
    useState<AriaInvalid>(undefined);
  const [achternaamHasError, setAchternaamHasError] =
    useState<AriaInvalid>(undefined);
  const [emailHasError, setEmailHasError] = useState<AriaInvalid>(undefined);
  const [geboortedatumHasError, setGeboortedatumHasError] =
    useState<AriaInvalid>(undefined);
  const [adresHasError, setAdresHasError] = useState<AriaInvalid>(undefined);
  const [telefoonnummerHasError, setTelefoonnummerHasError] =
    useState<AriaInvalid>(undefined);
  const [ervaringHasError, setErvaringHasError] =
    useState<AriaInvalid>(undefined);
  const [opmerkingHasError, setOpmerkingHasError] =
    useState<AriaInvalid>(undefined);

  //helpers
  const [isWaiting, setIsWaiting] = useState(false);

  const handleSubmit = async () => {
    setIsWaiting(true);
    setVoornaamHasError(false);
    setAchternaamHasError(false);
    setEmailHasError(false);
    setGeboortedatumHasError(false);
    setAdresHasError(false);
    setTelefoonnummerHasError(false);
    setErvaringHasError(false);
    setOpmerkingHasError(false);
    let isValid = true;

    if (voornaam.trim().length === 0) {
      setVoornaamHasError(true);
      isValid = false;
    }
    if (achternaam.trim().length === 0) {
      setAchternaamHasError(true);
      isValid = false;
    }
    if (email.trim().length === 0 || !email.includes("@")) {
      setEmailHasError(true);
      isValid = false;
    }
    if (adres.trim().length === 0) {
      setAdresHasError(true);
      isValid = false;
    }
    if (telefoonnummer.trim().length === 0) {
      setTelefoonnummerHasError(true);
      isValid = false;
    }
    if (ervaring.trim().length === 0) {
      setErvaringHasError(true);
      isValid = false;
    }
    if (opmerking.trim().length === 0) {
      setOpmerkingHasError(true);
      isValid = false;
    }
  };

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Inschrijven</h1>
          <p>
            Vul alsjeblieft alle velden in zodat we een goed beeld hebben over
            jou als nieuwe danser.
          </p>
          <hr />
        </hgroup>
      </header>
      <div className="container">
        <form>
          {" "}
          <label>
            Email*
            <small
              className={classNames("error", "float-right", {
                show: emailHasError,
              })}
            >
              Vul een geldig e-mailadres in.
            </small>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailHasError(undefined);
                setIsWaiting(false);
              }}
            />
          </label>
          <fieldset className="grid">
            <label>
              Voornaam*
              <small
                className={classNames("error", "float-right", {
                  show: voornaamHasError,
                })}
              >
                Vul je voornaam in.
              </small>
              <input
                type="text"
                value={voornaam}
                onChange={(e) => {
                  setVoornaam(e.target.value);
                  setVoornaamHasError(undefined);
                  setIsWaiting(false);
                }}
              />
            </label>
            <label>
              Achternaam*
              <small
                className={classNames("error", "float-right", {
                  show: achternaamHasError,
                })}
              >
                Vul je achternaam in.
              </small>
              <input
                type="text"
                value={achternaam}
                onChange={(e) => {
                  setAchternaam(e.target.value);
                  setAchternaamHasError(undefined);
                  setIsWaiting(false);
                }}
              />
            </label>
          </fieldset>
          <fieldset className="grid">
            <label>
              Geboortedatum*
              <small
                className={classNames("error", "float-right", {
                  show: geboortedatumHasError,
                })}
              >
                Vul je geboortedatum in.
              </small>
              <input
                type="date"
                value={geboortedatum.toISOString().split("T")[0]}
                onChange={(e) => {
                  setGeboortedatum(new Date(e.target.value));
                  setGeboortedatumHasError(undefined);
                  setIsWaiting(false);
                }}
              />
            </label>
            <label>
              Telefoonnummer*
              <small
                className={classNames("error", "float-right", {
                  show: telefoonnummerHasError,
                })}
              >
                Vul je telefoonnummer in.
              </small>
              <input
                type="tel"
                value={telefoonnummer}
                onChange={(e) => {
                  setTelefoonnummer(e.target.value);
                  setTelefoonnummerHasError(undefined);
                  setIsWaiting(false);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Adres*
              <small
                className={classNames("error", "float-right", {
                  show: adresHasError,
                })}
              >
                Vul je adres in.
              </small>
              <textarea
                value={adres}
                onChange={(e) => {
                  setAdres(e.target.value);
                  setAdresHasError(undefined);
                  setIsWaiting(false);
                }}
                placeholder="Straat, nummer en gemeente"
                rows={2}
              />
            </label>
            <label>
              Ervaring met dansen*
              <small
                className={classNames("error", "float-right", {
                  show: ervaringHasError,
                })}
              >
                Heb je ervaring met dansen? Vul anders 'geen' in.
              </small>
              <textarea
                value={ervaring}
                onChange={(e) => {
                  setErvaring(e.target.value);
                  setErvaringHasError(undefined);
                  setIsWaiting(false);
                }}
                placeholder="Beschrijf kort je ervaring met dansen en met Ierse dans in het bijzonder."
                rows={3}
              />
            </label>
            <label>
              Opmerkingen*
              <small
                className={classNames("error", "float-right", {
                  show: opmerkingHasError,
                })}
              >
                Als je niets extra wenst te melden. Vul dan 'geen' in.
              </small>
              <textarea
                value={opmerking}
                onChange={(e) => {
                  setOpmerking(e.target.value);
                  setOpmerkingHasError(undefined);
                  setIsWaiting(false);
                }}
                placeholder="Eventuele opmerkingen of vragen, vul anders 'geen' in."
                rows={4}
              />
            </label>
          </fieldset>
          <button
            aria-busy={isWaiting}
            className="primary float-right"
            disabled={isWaiting}
            onClick={handleSubmit}
          >
            Versturen
          </button>
        </form>
      </div>
    </>
  );
}
