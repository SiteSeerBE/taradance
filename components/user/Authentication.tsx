"use client";

import { useContext } from "react";
import { SignInButton, SignOutButton } from "@/components/buttons";
import { AuthContext } from "@/lib/authProvider";
import Registration from "./Registration";

const Authentication = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <div>
      <article className="container">
        {!user && (
          <div className="row center-xs">
            <p className="col-xs-11">
              Op je dashbord kan je als danser je agenda volgen en allerlei
              andere interessante informatie raadplegen. Log in via één van de
              volgende opties:
            </p>
            <SignInButton />
          </div>
        )}

        {user && (
          <div className="row end-xs">
            <SignOutButton />
            <div className="col-xs-1" />
          </div>
        )}
      </article>
      {user && <Registration userId={user.uid} />}
    </div>
  );
};

export default Authentication;
