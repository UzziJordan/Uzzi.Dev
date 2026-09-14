import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-[#050607] text-white flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600">
          CHECKING SESSION...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
