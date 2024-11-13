import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import  Colors  from '../constants/Colors'; 
import {YKINAStyle} from '@/constants/Stylesheet'; 
import api from '@/util/api';


export default function Home() {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  

  useEffect(() => {
    // Randomly select an inspiring sentence
    const fetchInspiringSentences = async () => {
      try {
        const apiInstance = await api();
        const sentences = await apiInstance.getInspiringSentences();
  
        // Randomly select a sentence after fetching
        const randomQuote = sentences[Math.floor(Math.random() * sentences.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error("Failed to fetch sentences:", error);
      }
    };
  
    fetchInspiringSentences();

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


