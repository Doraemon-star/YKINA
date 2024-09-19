import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/forgotpassword" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="login/register" options={{ title: 'Register' }} />
      <Stack.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="dashboard/medical/index" options={{ title: 'Medical Records' }} />
      <Stack.Screen name="dashboard/match/index" options={{ title: 'Match' }} />
      <Stack.Screen name="dashboard/conversation/index" options={{ title: 'Chat' }} />
    </Stack>
  );
}
