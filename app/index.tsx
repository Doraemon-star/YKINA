import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import inspiringSentences from '../constants/inspiringSentences'; 
import  Colors  from '../constants/Colors'; 
import {YKINAStyle} from '@/constants/Stylesheet'; 

export default function Home() {
  const router = useRouter();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Randomly select an inspiring sentence
    const randomQuote = inspiringSentences[Math.floor(Math.random() * inspiringSentences.length)];
    setQuote(randomQuote);

    // Automatically navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard/medical');
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/image5.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlayCenter}>
        <View style={YKINAStyle.quoteContainer}>
          <Text style={YKINAStyle.quoteText}>{quote}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}


