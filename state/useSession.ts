import type { ApiResponse } from "./../interfaces/formInputs";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import callApi from "@/lib/api/callApi";

interface Session {
  loading: boolean;
  user: unknown;
  isAuthenticated: boolean;
  clearSession: () => void;
  getSession: () => Promise<void>;
  updateUser: () => void;
}

const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false,
};

export const useSession = createWithEqualityFn<Session>(
  (set) => ({
    ...initialState,
    getSession: async () => {
      try {
        const { data } = await callApi<ApiResponse>("/auth/session");

        set({
          isAuthenticated: data ? true : false,
          user: data?.data ?? null,
          loading: false,
        });
      } catch (error) {
        console.error("Error during getSession:", error);
      }
    },

    updateUser: () => {},

    clearSession: () => {
      set({ ...initialState, loading: false });

      window.location.replace("/signin/unauthorized=true");
    },
  }),
  shallow,
);
