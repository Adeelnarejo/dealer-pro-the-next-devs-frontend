import "./App.css";

import { useEffect, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "./components/main/Header";
import Sidebar from "./components/main/Sidebar";
import ThemeToggle from "./theme/ThemeToggle";

import {
  publicRoutes,
  privateRoutes,
} from "./routes/index";

import { Toaster } from "react-hot-toast";

// =========================================================
// AUTH HELPERS
// =========================================================

const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    // Check JWT expiry
    if (
      payload.exp &&
      payload.exp * 1000 < Date.now()
    ) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      return false;
    }

    return true;
  } catch {
    // Invalid token
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    return false;
  }
};

// =========================================================
// PROTECTED ROUTE
// =========================================================

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <>{children}</>;
}

// =========================================================
// APP
// =========================================================

function App() {
  // =========================================================
  // SIDEBAR STATE
  // =========================================================

  const [sidebarOpen, setSidebarOpen] =
    useState<boolean>(
      window.innerWidth > 1024
    );

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(
        window.innerWidth > 1024
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  // =========================================================
  // LOCATION
  // =========================================================

  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // AUTH STATE
  // =========================================================

  const [authenticated, setAuthenticated] =
    useState<boolean>(
      isAuthenticated()
    );

  // =========================================================
  // CHECK SESSION
  // =========================================================

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(
        isAuthenticated()
      );
    };

    checkAuth();

    // Login/logout updates
    window.addEventListener(
      "auth-change",
      checkAuth
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        checkAuth
      );
    };
  }, [location.pathname]);

  // =========================================================
  // LANDING WEBSITE PAGES
  // =========================================================

  const isLandingWebsitePage =
    location.pathname === "/" ||
    location.pathname === "/inventory" ||
    location.pathname === "/dealerships" ||
    location.pathname === "/features" ||
    location.pathname === "/services";

  // =========================================================
  // AUTH PAGES
  // =========================================================

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // =========================================================
  // PUBLIC AGREEMENT SIGNING
  // =========================================================

  const isAgreementSignPath =
    location.pathname.startsWith(
      "/agreement-sign/"
    );

  // =========================================================
  // REDIRECT AUTHENTICATED USER FROM LOGIN
  // =========================================================

  useEffect(() => {
    if (
      isAuthPage &&
      authenticated
    ) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [
    authenticated,
    isAuthPage,
    navigate,
  ]);

  // =========================================================
  // ALL ROUTES
  // =========================================================

  const allRoutes = [
    ...publicRoutes,
    ...privateRoutes,
  ];

  // =========================================================
  // REMOVE DUPLICATE ROUTES
  // =========================================================

  const finalRoutes =
    allRoutes.filter(
      (route, index, self) =>
        index ===
        self.findIndex(
          (item) =>
            item.path === route.path
        )
    );

  // =========================================================
  // APP UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          TOASTER
      ===================================================== */}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      {/* =====================================================
          GLOBAL DESKTOP THEME TOGGLE

          ThemeToggle itself hides this version below lg.
          Mobile version is rendered inside Header menu.
      ===================================================== */}

      <ThemeToggle />

      {/* =====================================================
          MAIN WRAPPER
      ===================================================== */}

      <div
        className={
          isLandingWebsitePage ||
          isAuthPage ||
          isAgreementSignPath
            ? "min-h-screen"
            : "min-h-screen bg-[#F5F7FA] dark:bg-slate-950 flex flex-row"
        }
      >
        {/* ===================================================
            SIDEBAR
        =================================================== */}

        {!isAuthPage &&
          !isLandingWebsitePage &&
          !isAgreementSignPath && (
            <>
              {/* DESKTOP SIDEBAR */}

              <div className="hidden lg:block w-[240px] shrink-0">
                <Sidebar isOpen={true} />
              </div>

              {/* MOBILE SIDEBAR */}

              <div className="lg:hidden">
                <Sidebar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </div>
            </>
          )}

        {/* ===================================================
            CONTENT AREA
        =================================================== */}

        <div
          className={
            isLandingWebsitePage ||
            isAuthPage ||
            isAgreementSignPath
              ? "w-full"
              : "flex-1 flex flex-col min-h-screen min-w-0"
          }
        >
          {/* =================================================
              HEADER
          ================================================= */}

          {!isAuthPage &&
            !isLandingWebsitePage &&
            !isAgreementSignPath && (
              <Header
                toggleSidebar={toggleSidebar}
                sidebarOpen={sidebarOpen}
              />
            )}

          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <main
            className={
              isLandingWebsitePage ||
              isAuthPage ||
              isAgreementSignPath
                ? "w-full"
                : "flex-1 min-w-0"
            }
          >
            <Routes>
              {finalRoutes.map(
                (route, index) => {
                  const isPrivateRoute =
                    privateRoutes.some(
                      (privateRoute) =>
                        privateRoute.path ===
                        route.path
                    );

                  // =================================================
                  // PUBLIC ROUTE
                  // =================================================

                  if (!isPrivateRoute) {
                    return (
                      <Route
                        key={`${route.path}-${index}`}
                        path={route.path}
                        element={
                          <route.component />
                        }
                      />
                    );
                  }

                  // =================================================
                  // PRIVATE ROUTE
                  // =================================================

                  return (
                    <Route
                      key={`${route.path}-${index}`}
                      path={route.path}
                      element={
                        <ProtectedRoute>
                          <route.component />
                        </ProtectedRoute>
                      }
                    />
                  );
                }
              )}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
