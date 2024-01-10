import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../../../screens/auth/login';
import {Signup} from '../../../screens/auth/signup';

const Stack = createNativeStackNavigator();

export const UnauthenticatedStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);
