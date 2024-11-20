import { Stack } from "expo-router";
import YKINAHeaderOptions from '../components/header/YKINAHeader'; 

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/forgotpassword" options={{...YKINAHeaderOptions, headerBackTitle: 'Login'}} />
      <Stack.Screen name="login/register"  options={{...YKINAHeaderOptions, headerBackTitle: 'Login'}} />
      <Stack.Screen name="dashboard/index" options={{...YKINAHeaderOptions, headerBackTitle: 'Login'}} />
      <Stack.Screen name="dashboard/diagnosis" options={{...YKINAHeaderOptions, headerBackTitle: 'Dashboard'}} />
      <Stack.Screen name="dashboard/medication" options={{...YKINAHeaderOptions, headerBackTitle: 'Dashboard'}} />
      <Stack.Screen name="dashboard/matchlist" options={{...YKINAHeaderOptions, headerBackTitle: 'Dashboard'}} />
    </Stack>
  );
}

