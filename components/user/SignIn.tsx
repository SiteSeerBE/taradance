"use client";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  return (
    <button
      onClick={() => {
        onSignIn();
      }}
    >
      Aanmelden
    </button>
  );
};

export default SignIn;
