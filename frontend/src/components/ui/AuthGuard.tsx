
import { Navigate } from "react-router"

// Mock authentication logic (replace with your actual implementation)
const useIsAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null; // Replace with actual token validation logic
};

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
