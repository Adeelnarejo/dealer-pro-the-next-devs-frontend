import { useCallback, useEffect, useState } from "react";
import { makeGetRequest } from "../api/Api";

interface Role {
  role_id: number;
  name: string;
  description: string;
}

interface Permission {
  permission_id: string;
  resource_id: number;
  can_read: number;
  can_create: number;
  can_update: number;
  can_delete: number;
  resource: null | Record<string, unknown>;
}

export interface UserProfile {
  user_id: number;
  first: string;
  last: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  user_type: string;
  is_active: boolean;
  type: Role;
  profile_data?: string;
  permissionsCount: number;
  permissions: Permission[];
}

interface UserProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

export const useUserProfile = () => {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  const getStoredUserId = (): string | null => {
    if (typeof window === "undefined") {
      return null;
    }

    return (
      sessionStorage.getItem("userId") ||
      localStorage.getItem("userId")
    );
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = getStoredUserId();

      if (!userId) {
        throw new Error(
          "User ID was not found. Please log in again."
        );
      }

      const response =
        await makeGetRequest(
          `user/getUserById/${encodeURIComponent(userId)}`
        );

      const result =
        response?.data as UserProfileResponse;

      if (!result?.success || !result?.data) {
        throw new Error(
          result?.message ||
            "Unable to load your profile."
        );
      }

      const profile = result.data;

      /*
       * Normalize different backend naming conventions
       * so the Profile page can use the same fields.
       */
      const firstName =
        profile.first_name ||
        profile.firstName ||
        profile.first ||
        "";

      const lastName =
        profile.last_name ||
        profile.lastName ||
        profile.last ||
        "";

      const fullName =
        profile.full_name ||
        profile.fullName ||
        profile.name ||
        `${firstName} ${lastName}`.trim();

      setUser({
        ...profile,

        first: profile.first || firstName,
        last: profile.last || lastName,

        first_name: firstName,
        last_name: lastName,

        firstName,
        lastName,

        full_name: fullName,
        fullName,
        name: fullName,

        permissions:
          Array.isArray(profile.permissions)
            ? profile.permissions
            : [],

        permissionsCount:
          Number(profile.permissionsCount) || 0,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load your profile.";

      setUser(null);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();

    /*
     * Refresh profile after login/logout changes.
     */
    const handleAuthChange = () => {
      fetchUserProfile();
    };

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );
    };
  }, [fetchUserProfile]);

  return {
    user,
    loading,
    error,
    refetch: fetchUserProfile,
  };
};
