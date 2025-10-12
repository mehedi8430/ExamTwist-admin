// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
//   FetchBaseQueryMeta,
// } from "@reduxjs/toolkit/query";
// import { removeUserInfo } from "../slices/authSlice";

// interface PersistedUserInfo {
//   token: string;
// }

// // Function to check if JWT is expired (decode without verification)
// function isTokenExpired(token: string): boolean {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// }

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers: Headers): Headers => {
//     const storedData = localStorage.getItem("persist:userInfo");
//     if (!storedData) {
//       return headers;
//     }

//     let userInfo: PersistedUserInfo | null = null;

//     try {
//       userInfo = JSON.parse(storedData) as PersistedUserInfo;
//       console.log({ userInfo });
//     } catch {
//       // Invalid JSON, clear it
//       localStorage.removeItem("persist:userInfo");
//       return headers;
//     }

//     const { token } = userInfo;
//     console.log({ token });

//     if (token && !isTokenExpired(token)) {
//       headers.set("authorization", `Bearer ${token}`);
//     } else {
//       // Token expired or invalid, clear storage immediately
//       localStorage.removeItem("persist:userInfo");
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError,
//   Record<string, unknown>,
//   FetchBaseQueryMeta
// > = async (args, api, extraOptions) => {
//   const result = await rawBaseQuery(args, api, extraOptions);
//   console.log({ result });

//   if (result.error?.status === 401) {
//     localStorage.removeItem("persist:userInfo");
//     api.dispatch(removeUserInfo());
//     window.location.href = "/admin/login";
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
//   tagTypes: ["auth", "user"],
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const storedData = localStorage.getItem("persist:userInfo");
      const accessToken = JSON.parse(storedData!)?.token;

      if (accessToken) headers.set("authorization", JSON.parse(accessToken));

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "user"],
});

// import { toast } from "sonner";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { removeUserInfo } from "../slices/authSlice";

// interface ErrorResponse {
//   code?: string;
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_API_URL,
//   prepareHeaders: async (headers, { getState }) => {
//     const token = (getState() as { auth: { access_token: string } })?.auth
//       ?.access_token;

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: async (args, api, extraOptions) => {
//     const result = await baseQuery(args, api, extraOptions);

//     if (result.error) {
//       const errorData = result.error.data as ErrorResponse | undefined;
//       if (errorData?.code === "token_not_valid") {
//         toast.warning("your access token is expired!");
//         api.dispatch(removeUserInfo());
//       }
//     }

//     return result;
//   },
//   tagTypes: ["auth", "user"],
//   endpoints: () => ({}),
// });
