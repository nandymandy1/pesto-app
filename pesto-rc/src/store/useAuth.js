import { create as createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import client from "@services/apollo";
import { GET_AUTH_USER_QUERY } from "@graphql/Auth";

const useAuth = createStore(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        loading: false,
        isLoggedIn: false,

        authenticateUser: async () => {
          const token = localStorage.getItem("token");
          if (!token) return;
          try {
            set(
              produce((state) => {
                state.loading = true;
              })
            );
            const {
              data: { getAuthUser },
            } = await client.query({ query: GET_AUTH_USER_QUERY });
            set(
              produce((state) => {
                state.user = getAuthUser;
                state.isLoggedIn = true;
              })
            );
          } catch (err) {
            console.error(err);
            get().logoutUser();
          } finally {
            produce((state) => {
              state.loading = false;
            });
          }
        },

        loginUser: ({ user, token }) => {
          set(
            produce((state) => {
              state.user = user;
              state.isLoggedIn = true;
            })
          );
          localStorage.setItem("token", token);
        },

        logoutUser: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("authState");

          set(
            produce((state) => {
              state.user = null;
              state.loading = false;
              state.isLoggedIn = false;
            })
          );
        },
      }),
      { name: "authState" }
    )
  )
);

window.useAuth = useAuth;

export default useAuth;
