import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PublicHome from "../pages/PublicHome";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";

import ProtectedRoute from "../components/admin/ProtectedRoute";

// Lazy-loaded Admin components
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminProjects = lazy(() => import("../pages/admin/Projects"));
const AddProject = lazy(() => import("../pages/admin/AddProject"));
const EditProject = lazy(() => import("../pages/admin/EditProject"));
const Profile = lazy(() => import("../pages/admin/Profile"));
const Contact = lazy(() => import("../pages/admin/Contact"));
const Stack = lazy(() => import("../pages/admin/Stack"));
const Messages = lazy(() => import("../pages/admin/Messages"));

const PageLoader = () => (
  <div className="min-h-screen bg-[#08090a] text-white flex items-center justify-center">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
      <span className="font-mono text-[11px] tracking-[0.25em] text-gray-500 uppercase">
        Loading...
      </span>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* PROTECTED ADMIN */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/projects/new" element={<AddProject />} />
            <Route path="/admin/projects/edit/:id" element={<EditProject />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/contact" element={<Contact />} />
            <Route path="/admin/stack" element={<Stack />} />
            <Route path="/admin/messages" element={<Messages />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;