import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { signOut } from "@aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
};

export default function SignIn() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Authenticator formFields={formFields} hideSignUp>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </Authenticator>
    </div>
  );
}
