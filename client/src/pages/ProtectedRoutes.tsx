import { useAuthenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== "authenticated") {
    return <Navigate to="/admin" replace />;
  }

  // render Dashboard component
  return <>{children}</>;
}
