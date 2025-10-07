import { baseApi } from "../api";
import { removeUserInfo, storeUserInfo } from "../slices/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // User Register
    userRegister: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // user login
    userLogin: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const response = result.data;
          dispatch(storeUserInfo(response?.data?.token));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // user logout
    userLogout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(removeUserInfo());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // user forgot password
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/forget-password",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    verifyOTPPassword: build.mutation({
      query: (data) => ({
        url: `/verify-otp-password`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    resendOTP: build.mutation({
      query: (data) => ({
        url: `/resend-otp`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: `/reset-password`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOTPPasswordMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
} = authApi;
