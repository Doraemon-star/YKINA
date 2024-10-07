// app/dashboard/medical.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 

export default function MedicalScreen() {
  const router = useRouter();

  const navigateToDiagnosis = () => {
    router.push('/dashboard/medical/diagnosis'); // Navigates to the Diagnosis page
  };
  const navigateToMedication = () => {
    router.push('/dashboard/medical/medication'); // Navigates to the Diagnosis page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Medical Records</Text>
      <Button title="Go to Diagnosis" onPress={navigateToDiagnosis} />
      <Button title="Go to Medication" onPress={navigateToMedication} />

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