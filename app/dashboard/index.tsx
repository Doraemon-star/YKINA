import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Dashboard () {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I am dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,             // Make the View fill the entire screen
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',    // Center the content horizontally
    backgroundColor: '#f0f0f0', // Add a background color
  },
  text: {
    fontSize: 20,       // Adjust text size
    color: '#333',      // Ensure the text color contrasts with the background
  },
});
