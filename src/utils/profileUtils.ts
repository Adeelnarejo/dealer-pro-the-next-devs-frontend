/**
 * Get user initials for profile avatars.
 *
 * Example:
 * getProfileInitials("John", "Doe") => "JD"
 */
export const getProfileInitials = (
  firstName = "",
  lastName = ""
): string => {
  const firstInitial = firstName.trim().charAt(0).toUpperCase();
  const lastInitial = lastName.trim().charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}` || "U";
};

/**
 * Get a consistent avatar color based on the user's ID.
 *
 * The same user will always receive the same color.
 */
export const getRandomColor = (userId: number | string = 0): string => {
  const colors = [
    "#2563EB",
    "#1D4ED8",
    "#4F46E5",
    "#7C3AED",
    "#9333EA",
    "#C026D3",
    "#DB2777",
    "#E11D48",
    "#DC2626",
    "#EA580C",
    "#D97706",
    "#CA8A04",
    "#65A30D",
    "#16A34A",
    "#059669",
    "#0D9488",
    "#0891B2",
    "#0284C7",
    "#0369A1",
    "#475569",
  ];

  const numericId =
    typeof userId === "number"
      ? userId
      : Number.parseInt(userId, 10) || 0;

  const index =
    Math.abs(numericId) % colors.length;

  return colors[index];
};

/**
 * Get a complete profile display name.
 */
export const getProfileName = (
  firstName = "",
  lastName = ""
): string => {
  const name = `${firstName.trim()} ${lastName.trim()}`.trim();

  return name || "User";
};

/**
 * Get a safe email display value.
 */
export const getProfileEmail = (
  email = ""
): string => {
  return email.trim() || "No email available";
};
