// app/dashboard/index.tsx
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function DashboardPage() {
  return (
    <View>
      <Text>Dashboard</Text>
      <Link href="/dashboard/notification">
        <Button title="Go to Notifications" />
      </Link>
      <Link href="/dashboard/settings">
        <Button title="Go to Settings" />
      </Link>
      <Link href="/dashboard/todo">
        <Button title="Go to Todo List" />
      </Link>
      <Link href="/dashboard/medical">
        <Button title="Go to Medical Records" />
      </Link>
      <Link href="/dashboard/match">
        <Button title="Go to Match Page" />
      </Link>
      <Link href="/dashboard/chat">
        <Button title="Go to Conversations" />
      </Link>
    </View>
  );
}
