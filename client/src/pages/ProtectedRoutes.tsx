import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/sign-in" />;
}
