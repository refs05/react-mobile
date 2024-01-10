import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuthState {
  auth: any | null;
}

const initialState: IAuthState = {
  auth: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setJwt: (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
      // window.location.reload();
    },
  },
});

export default authSlice.reducer;

export const {setJwt} = authSlice.actions;
