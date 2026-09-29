import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  UserRound,
  Settings,
  UsersRound,
  LogOut,
  X,
  Bell,
  ShieldCheck,
  Command,
} from "lucide-react";

import { useUserProfile } from "../../utils/useUserProfile";
import {
  getProfileInitials,
  getRandomColor,
} from "../../utils/profileUtils";

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  sidebarOpen = false,
}) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { user, loading } = useUserProfile();

  /* =========================================================
     OUTSIDE CLICK + ESC
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        searchRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     CTRL + K SEARCH
  ========================================================= */

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");

    setIsDropdownOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  /* =========================================================
     PROFILE
  ========================================================= */

  const profileInitials = user
    ? getProfileInitials(user.first, user.last)
    : "";

  const profileColor = user
    ? getRandomColor(user.user_id)
    : "#2563EB";

  const fullName = user
    ? `${user.first} ${user.last}`
    : "Guest User";

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goTo = (path: string) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) return;

    navigate(
      `/vehicles-search?search=${encodeURIComponent(value)}`,
    );
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-16
        w-full
        border-b
        border-slate-200/80
        bg-white/90
        backdrop-blur-xl
        transition-colors
        duration-300

        dark:border-white/[0.07]
        dark:bg-[#07111F]/90
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-between
          gap-3
          px-3
          sm:px-5
          lg:px-6
          xl:px-8
        "
      >
        {/* =================================================
            LEFT
        ================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile sidebar */}
          {toggleSidebar && (
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition-all

                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-600

                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-slate-300
                dark:hover:bg-blue-500/10
                dark:hover:text-blue-400

                lg:hidden
              "
            >
              <div className="relative flex h-5 w-5 flex-col justify-center gap-1">
                <span
                  className={`
                    block
                    h-[2px]
                    w-5
                    rounded-full
                    bg-current
                    transition-all
                    duration-300
                    ${
                      sidebarOpen
                        ? "translate-y-[3px] rotate-45"
                        : ""
                    }
                  `}
                />

                <span
                  className={`
                    block
                    h-[2px]
                    w-4
                    rounded-full
                    bg-current
                    transition-all
                    duration-300
                    ${
                      sidebarOpen
                        ? "opacity-0"
                        : "opacity-100"
                    }
                  `}
                />

                <span
                  className={`
                    block
                    h-[2px]
                    w-5
                    rounded-full
                    bg-current
                    transition-all
                    duration-300
                    ${
                      sidebarOpen
                        ? "-translate-y-[3px] -rotate-45"
                        : ""
                    }
                  `}
                />
              </div>
            </button>
          )}

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="
              relative
              w-full
              max-w-xl
            "
          >
            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
                -translate-y-1/2
                text-slate-400
                dark:text-slate-500
              "
            />

            <input
              ref={searchRef}
              type="search"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              placeholder="Search vehicles, customers..."
              aria-label="Search"
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-10
                pr-20
                text-sm
                text-slate-700
                outline-none
                transition-all

                placeholder:text-slate-400

                hover:border-slate-300

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-slate-200
                dark:placeholder:text-slate-500

                dark:hover:border-white/[0.14]

                dark:focus:border-blue-500/60
                dark:focus:bg-white/[0.06]
                dark:focus:ring-blue-500/10

                [&::-webkit-search-cancel-button]:hidden
              "
            />

            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className="
                  absolute
                  right-10
                  top-1/2
                  flex
                  h-6
                  w-6
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-md
                  text-slate-400
                  transition

                  hover:bg-slate-200
                  hover:text-slate-600

                  dark:hover:bg-white/10
                  dark:hover:text-slate-200
                "
              >
                <X size={14} />
              </button>
            )}

            <div
              className="
                pointer-events-none
                absolute
                right-2
                top-1/2
                hidden
                -translate-y-1/2
                items-center
                gap-1
                rounded-md
                border
                border-slate-200
                bg-white
                px-1.5
                py-0.5
                text-[10px]
                font-medium
                text-slate-400
                sm:flex

                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-slate-500
              "
            >
              <Command size={10} />
              <span>K</span>
            </div>
          </form>
        </div>

        {/* =================================================
            RIGHT
        ================================================== */}

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition-all

              hover:bg-slate-100
              hover:text-slate-700

              dark:text-slate-400
              dark:hover:bg-white/[0.06]
              dark:hover:text-slate-200
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                right-2.5
                top-2.5
                h-1.5
                w-1.5
                rounded-full
                bg-blue-500
                ring-2
                ring-white

                dark:ring-[#07111F]
              "
            />
          </button>

          <div
            className="
              hidden
              h-7
              w-px
              bg-slate-200
              sm:block

              dark:bg-white/[0.08]
            "
          />

          {/* =================================================
              PROFILE
          ================================================== */}

          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setIsDropdownOpen((prev) => !prev)
              }
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                px-1.5
                py-1.5
                outline-none
                transition-all

                hover:bg-slate-100

                focus-visible:ring-2
                focus-visible:ring-blue-500/30

                dark:hover:bg-white/[0.06]
              "
            >
              {/* Avatar */}
              {loading ? (
                <div
                  className="
                    h-9
                    w-9
                    animate-pulse
                    rounded-full
                    bg-slate-200

                    dark:bg-white/10
                  "
                />
              ) : user ? (
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                    ring-2
                    ring-white
                    transition-transform
                    group-hover:scale-105

                    dark:ring-[#07111F]
                  "
                  style={{
                    backgroundColor: profileColor,
                  }}
                >
                  {profileInitials}
                </div>
              ) : (
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-500

                    dark:bg-white/[0.08]
                    dark:text-slate-400
                  "
                >
                  <UserRound size={17} />
                </div>
              )}

              {/* User */}
              <div className="hidden min-w-0 text-left sm:block">
                <p
                  className="
                    max-w-[145px]
                    truncate
                    text-sm
                    font-semibold
                    text-slate-800

                    dark:text-white
                  "
                >
                  {loading ? "Loading..." : fullName}
                </p>

                {user?.email && (
                  <p
                    className="
                      max-w-[145px]
                      truncate
                      text-[10px]
                      text-slate-400

                      dark:text-slate-500
                    "
                  >
                    {user.email}
                  </p>
                )}
              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden
                  text-slate-400
                  transition-transform
                  duration-200
                  sm:block

                  dark:text-slate-500

                  ${
                    isDropdownOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* =================================================
                DROPDOWN
            ================================================== */}

            <div
              className={`
                absolute
                right-0
                top-full
                z-50
                mt-2
                w-[290px]
                origin-top-right
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                shadow-slate-900/10
                transition-all
                duration-200

                dark:border-white/[0.08]
                dark:bg-[#0B1727]
                dark:shadow-black/30

                ${
                  isDropdownOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                }
              `}
            >
              {/* User Header */}
              <div
                className="
                  relative
                  overflow-hidden
                  border-b
                  border-slate-100
                  bg-slate-50
                  px-4
                  py-4

                  dark:border-white/[0.07]
                  dark:bg-[#0D1B2E]
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-blue-500/10
                    blur-2xl
                  "
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-bold
                      text-white
                      shadow-md
                      ring-2
                      ring-white

                      dark:ring-[#0D1B2E]
                    "
                    style={{
                      backgroundColor: profileColor,
                    }}
                  >
                    {profileInitials || "?"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-slate-800

                        dark:text-white
                      "
                    >
                      {fullName}
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      {user?.email || "Guest User"}
                    </p>
                  </div>

                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-full
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-2
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-emerald-600

                      dark:border-emerald-500/20
                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </span>
                </div>
              </div>

              {/* Account */}
              <div className="px-3 pb-1 pt-3">
                <p
                  className="
                    px-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400

                    dark:text-slate-600
                  "
                >
                  Account
                </p>
              </div>

              <div className="px-2 pb-2">
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => goTo("/profile")}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-slate-700
                    transition-all

                    hover:bg-slate-50

                    dark:text-slate-300
                    dark:hover:bg-white/[0.06]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-slate-500
                      transition-colors

                      group-hover:bg-blue-50
                      group-hover:text-blue-600

                      dark:bg-white/[0.06]
                      dark:text-slate-400
                      dark:group-hover:bg-blue-500/10
                      dark:group-hover:text-blue-400
                    "
                  >
                    <UserRound size={16} />
                  </span>

                  <span className="flex-1">
                    <span className="block font-medium">
                      Profile
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-[10px]
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      View your account
                    </span>
                  </span>
                </button>

                {/* Settings */}
                <button
                  type="button"
                  onClick={() => goTo("/profile")}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-slate-700
                    transition-all

                    hover:bg-slate-50

                    dark:text-slate-300
                    dark:hover:bg-white/[0.06]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-slate-500
                      transition-colors

                      group-hover:bg-blue-50
                      group-hover:text-blue-600

                      dark:bg-white/[0.06]
                      dark:text-slate-400
                      dark:group-hover:bg-blue-500/10
                      dark:group-hover:text-blue-400
                    "
                  >
                    <Settings size={16} />
                  </span>

                  <span className="flex-1">
                    <span className="block font-medium">
                      Settings
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-[10px]
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Manage preferences
                    </span>
                  </span>
                </button>

                {/* User Management */}
                <button
                  type="button"
                  onClick={() =>
                    goTo("/users-management")
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-slate-700
                    transition-all

                    hover:bg-slate-50

                    dark:text-slate-300
                    dark:hover:bg-white/[0.06]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      text-slate-500
                      transition-colors

                      group-hover:bg-blue-50
                      group-hover:text-blue-600

                      dark:bg-white/[0.06]
                      dark:text-slate-400
                      dark:group-hover:bg-blue-500/10
                      dark:group-hover:text-blue-400
                    "
                  >
                    <UsersRound size={16} />
                  </span>

                  <span className="flex-1">
                    <span className="block font-medium">
                      User Management
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-[10px]
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Manage dealership users
                    </span>
                  </span>
                </button>
              </div>

              {/* Security */}
              <div
                className="
                  mx-3
                  mb-2
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-blue-100
                  bg-blue-50
                  px-3
                  py-2.5

                  dark:border-blue-500/10
                  dark:bg-blue-500/[0.06]
                "
              >
                <ShieldCheck
                  size={15}
                  className="
                    shrink-0
                    text-blue-600

                    dark:text-blue-400
                  "
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      text-blue-700

                      dark:text-blue-300
                    "
                  >
                    DealerPro Security
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-blue-500/70

                      dark:text-blue-400/60
                    "
                  >
                    Your account is protected
                  </p>
                </div>
              </div>

              {/* Logout */}
              <div
                className="
                  border-t
                  border-slate-100
                  p-2

                  dark:border-white/[0.07]
                "
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-medium
                    text-red-600
                    transition-all

                    hover:bg-red-50

                    dark:text-red-400
                    dark:hover:bg-red-500/10
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      transition-colors

                      group-hover:bg-red-100

                      dark:bg-red-500/10
                      dark:group-hover:bg-red-500/20
                    "
                  >
                    <LogOut size={16} />
                  </span>

                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
