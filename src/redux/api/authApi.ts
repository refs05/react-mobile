import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {userApi} from './userApi';
import {setJwt} from '../features/authSlice';
// import {ValidateOTPInput} from '../../pages/login/validateOTP';
import {logout} from '../features/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL}/corporate/api/authentication/`,
  }),
  tagTypes: ['auth'],
  endpoints: builder => ({
    loginUser: builder.mutation<any, any>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: {
            ...data,
            client_key: 'Corp-client-8UbSz590monAhMB',
            server_key: 'Corp-server-9Sd-PXJkvhlK6Bq',
          },
        };
      },
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;

          dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    refreshToken: builder.mutation<any, null>({
      query() {
        return {
          url: 'refresh',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          // body: {refresh_token: cookies.get('refresh_token')},
        };
      },
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data);
          // cookies.set('access_token', data.data.access_token);
          // cookies.set('refresh_token', data.data.refresh_token);
          dispatch(setJwt(data));
        } catch (error) {
          console.log(error);
          dispatch(logout());
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  //   useRegisterUserMutation,
  useRefreshTokenMutation,
} = authApi;
