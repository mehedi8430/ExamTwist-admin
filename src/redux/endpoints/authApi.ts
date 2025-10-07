import { baseApi } from "../api";
import { storeUserInfo } from "../slices/authSlice";

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

    userLogout: build.query({
      query: () => ({
        url: "/user/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useForgotPasswordMutation,
  useVerifyOTPPasswordMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useUserLogoutQuery,
} = authApi;
