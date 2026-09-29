import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import "./theme.css";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  mobile?: boolean;
}

const THEME_KEY = "dealerpro-theme";
const THEME_EVENT = "dealerpro-theme-change";

const getStoredTheme = (): Theme => {
  return localStorage.getItem(THEME_KEY) === "dark"
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);

  window.dispatchEvent(
    new CustomEvent(THEME_EVENT, {
      detail: theme,
    })
  );
};

const ThemeToggle = ({
  mobile = false,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(
    getStoredTheme
  );

  useEffect(() => {
    // Apply theme on first load
    const currentTheme = getStoredTheme();

    setTheme(currentTheme);

    document.documentElement.classList.toggle(
      "dark",
      currentTheme === "dark"
    );

    // Sync theme between multiple ThemeToggle instances
    const handleThemeChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<Theme>;

      const newTheme =
        customEvent.detail === "dark"
          ? "dark"
          : "light";

      setTheme(newTheme);

      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );
    };

    // Sync if localStorage changes
    const handleStorageChange = () => {
      const newTheme = getStoredTheme();

      setTheme(newTheme);

      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );
    };

    window.addEventListener(
      THEME_EVENT,
      handleThemeChange
    );

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        THEME_EVENT,
        handleThemeChange
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // =========================================================
  // MOBILE / TABLET VERSION
  // Rendered inside Header mobile menu
  // =========================================================

  if (mobile) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3
          transition-all
          duration-300
          hover:bg-slate-100

          dark:border-slate-700
          dark:bg-slate-800
          dark:hover:bg-slate-700
        "
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-white
              text-blue-600
              shadow-sm

              dark:bg-slate-900
              dark:text-blue-400
            "
          >
            {theme === "light" ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span
              className="
                text-sm
                font-semibold
                text-slate-800
                dark:text-slate-100
              "
            >
              Appearance
            </span>

            <span
              className="
                text-[11px]
                text-slate-500
                dark:text-slate-400
              "
            >
              {theme === "light"
                ? "Light mode"
                : "Dark mode"}
            </span>
          </div>
        </div>

        {/* SWITCH */}
        <span
          className="
            relative
            flex
            h-7
            w-14
            shrink-0
            items-center
            rounded-full
            bg-slate-200
            transition-colors
            dark:bg-slate-700
          "
        >
          <span
            className="
              absolute
              left-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-white
              text-blue-600
              shadow
              transition-transform
              duration-300

              dark:translate-x-7
              dark:bg-slate-900
              dark:text-blue-300
            "
          >
            {theme === "light" ? (
              <Sun size={12} />
            ) : (
              <Moon size={12} />
            )}
          </span>

          <Sun
            size={12}
            className="ml-1.5 text-slate-500"
          />

          <Moon
            size={12}
            className="ml-auto mr-1.5 text-slate-400"
          />
        </span>
      </button>
    );
  }

  // =========================================================
  // DESKTOP VERSION
  // =========================================================

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        fixed
        bottom-5
        right-5
        z-[9999]
        hidden
        items-center
        gap-2
        rounded-full
        border
        border-slate-200
        bg-white
        px-2
        py-2
        shadow-xl
        transition-all
        duration-300

        lg:flex

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/40
      "
    >
      <span
        className="
          relative
          flex
          h-7
          w-14
          items-center
          rounded-full
          bg-slate-200
          transition-colors
          dark:bg-slate-700
        "
      >
        <span
          className="
            absolute
            left-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-white
            text-blue-600
            shadow
            transition-transform
            duration-300

            dark:translate-x-7
            dark:bg-slate-800
            dark:text-blue-300
          "
        >
          {theme === "light" ? (
            <Sun size={13} />
          ) : (
            <Moon size={13} />
          )}
        </span>

        <Sun
          size={13}
          className="ml-1.5 text-slate-500"
        />

        <Moon
          size={13}
          className="ml-auto mr-1.5 text-slate-400"
        />
      </span>

      <span
        className="
          pr-1
          text-[10px]
          font-bold
          text-slate-600
          dark:text-slate-300
        "
      >
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
};

export default ThemeToggle;
