"use client";

import { useContext, useEffect, useState } from "react";
import { SignInButton, SignOutButton } from "@/components/buttons";
import { AuthContext } from "@/lib/authProvider";
import Registration from "./Registration";
import { getCollectionItem } from "@/lib/CRUD/getCollectionItem";
import DataCard from "./DataCard";
import EmailPassword from "./EmailPassword";
import type { DocumentData } from "@/lib/dataTypes";

const Authentication = () => {
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

  const { roles, user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      getCollectionItem("people", user.uid).then((data) => {
        if (data && data.id) {
          setUserData(data);
        } else {
          setUserData(null);
        }
      });
    }
  }, [user, showRegistration]);
  return (
    <div className="container">
      <article className="row center-xs mt1">
        {!user && (
          <div className="col-xs-11 col-sm-8 col-md-6">
            <h1>Aanmelden</h1>
            <p>Log in via één van de volgende opties:</p>
            <div className="row center-xs">
              <SignInButton />
              <small className="mt1">
                Om aan te melden met Google of Facebook hoef je niet eerst een
                account te maken.
              </small>
            </div>
            <hr className="col-xs-11" />
            <EmailPassword />
          </div>
        )}

        {user && (
          <div className="row end-xs">
            <SignOutButton />
            <div className="col-xs-1" />
          </div>
        )}
      </article>
      {user && (!userData || showRegistration) && (
        <Registration
          userId={user.uid}
          data={userData}
          onClick={() => setShowRegistration(false)}
        />
      )}
      {user && userData && !showRegistration && (
        <DataCard
          data={userData}
          roles={roles}
          user={user}
          onClick={() => setShowRegistration(true)}
        />
      )}
    </div>
  );
};

export default Authentication;
