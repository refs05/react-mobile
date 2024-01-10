import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserState {
  user: any | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: state => {
      AsyncStorage.removeItem('logged_in');
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('refresh_token');
      AsyncStorage.removeItem('is2fa');
      AsyncStorage.removeItem('rl');
      AsyncStorage.removeItem('div');
      state.user = initialState;
      //   location.href = '/login';
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      AsyncStorage.setItem('rl', action.payload.data.employee.data.title);
      AsyncStorage.setItem('div', action.payload.data.employee.data.division);
    },
  },
});

export default userSlice.reducer;

export const {logout, setUser} = userSlice.actions;
