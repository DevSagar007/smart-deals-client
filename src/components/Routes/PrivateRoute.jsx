import { Navigate, Outlet, useLocation } from "react-router";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute() {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
