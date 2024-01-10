import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout, setUser} from '../features/userSlice';
import {RootState} from '../store';
import {authApi} from './authApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.VITE_API_URL}/api/users/`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).authState.auth;

      return headers;
    },
  }),

  endpoints: builder => ({
    getMe: builder.query<any, any>({
      query() {
        return {
          url: `me?t=${Math.random()}`,
        };
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          if (error.error?.status === 401) {
            dispatch(authApi.endpoints.refreshToken.initiate(null));
          }
        }
      },
    }),
    logoutUser: builder.mutation<void, null>({
      query() {
        return {
          url: 'logout',
          method: 'POST',
        };
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(authApi.endpoints.refreshToken.initiate(null));
          }
        }
      },
    }),
    changePassword: builder.mutation<unknown, any>({
      query(data) {
        return {
          url: 'changepassword',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.logoutUser.initiate(null));
        } catch (error: any) {}
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLogoutUserMutation,
  // useCreateUserMutation,
  useChangePasswordMutation,
} = userApi;
