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
      <Stack.Screen name="dashboard/medical/index" options={{ title: 'Medical Records' }} />
      <Stack.Screen name="dashboard/match/index" options={{ title: 'Match' }} />
      <Stack.Screen name="dashboard/conversation/index" options={{ title: 'Chat' }} />
    </Stack>
  );
}

