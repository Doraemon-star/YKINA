import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import inspiringSentences from '../constants/inspiringSentences'; 
import { Colors } from '../constants/Colors'; 

export default function Home() {
  const router = useRouter();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Randomly select an inspiring sentence
    const randomQuote = inspiringSentences[Math.floor(Math.random() * inspiringSentences.length)];
    setQuote(randomQuote);

    // Automatically navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 6000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/image5.png')} // Replace with your own image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quoteContainer: {
    flex: 1 / 2, // Top half of the screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 28,
    color: Colors.grey.text,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 100
  },
});
