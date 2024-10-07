import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 

export default function Dashboard() {
  const router = useRouter();

  const navigateToMedical = () => {
    router.push('/dashboard/medical'); // Navigates to the Medical screen

   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>I am the dashboard</Text>
      <Button title="Go to Medical Records" onPress={navigateToMedical} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
