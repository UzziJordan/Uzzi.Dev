import {
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Projects",
    path: "/admin/projects",
  },
  {
    label: "Profile",
    path: "/admin/profile",
  },
  {
    label: "Contact",
    path: "/admin/contact",
  },
  {
    label: "Stack",
    path: "/admin/stack",
  },
  {
    label: "Messages",
    path: "/admin/messages",
  },
];

const AdminLayout = () => {
  const location =
    useLocation();

  const { logout } =
    useAuth();

  const activeItem =
    navItems.find((item) => {
      if (
        item.path ===
        "/admin/dashboard"
      ) {
        return (
          location.pathname ===
          item.path
        );
      }

      return location.pathname.startsWith(
        item.path
      );
    }) || navItems[0];

  const handleViewSite = () => {
    window.open(
      "/",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white">
      <main className="px-6 py-10 lg:px-14 lg:py-16">
        {/* HEADER */}
        <header>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#52677c]">
                Content Manager
              </p>

              <h1 className="mt-6 text-5xl font-semibold uppercase tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
                {activeItem.label}
              </h1>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={
                  handleViewSite
                }
                className="flex h-13 items-center gap-3 border border-white/10 px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/25 hover:text-white"
              >
                <span className="text-lg leading-none">
                  ↗
                </span>

                View Site
              </button>

              <button
                type="button"
                onClick={logout}
                className="flex h-13 items-center gap-3 border border-white/10 px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/25 hover:text-white"
              >
                <span className="text-lg leading-none">
                  ↪
                </span>

                Sign Out
              </button>
            </div>
          </div>

          {/* NAV */}
          <nav className="mt-12 border-y border-white/10">
            <div className="flex min-h-19 items-center gap-10 overflow-x-auto">
              {navItems.map(
                (item) => {
                  const isActive =
                    item.path ===
                    "/admin/dashboard"
                      ? location.pathname ===
                        item.path
                      : location.pathname.startsWith(
                          item.path
                        );

                  return (
                    <NavLink
                      key={
                        item.path
                      }
                      to={
                        item.path
                      }
                      className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] transition ${
                        isActive
                          ? "font-semibold text-white"
                          : "text-[#52677c] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  );
                }
              )}
            </div>
          </nav>
        </header>

        {/* PAGE */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;