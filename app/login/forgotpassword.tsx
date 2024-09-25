import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors'; 
import YKINAStyle from '../../constants/Stylesheet'; 

import { Ionicons } from '@expo/vector-icons'; // For icons
import { Checkbox } from 'expo-checkbox'; 
import { BlurView } from 'expo-blur'; // Import BlurView for frosted glass effect

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  // Handle Remember Me functionality
  const passwordReset = () => {
    
  };

  return (
    <ImageBackground
      source={require('../../assets/images/image22.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlay}>
        {/* Frosted Glass Effect Container using BlurView */}
        <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>
          {/* Login Title */}
          <Text style={YKINAStyle.title}>Fogot password</Text>

          {/* Input Fields */}
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Email"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons name="mail" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <Text style={YKINAStyle.generalTextLarge}>
            We will send a link for password reset to your email. Please set up the new
            password and login agian. {'\n'} 
          </Text>
          {/* Login Button */}
          <TouchableOpacity style={YKINAStyle.whiteButtonContainer}>
            <Text style={YKINAStyle.blackButtonText}>Submit</Text>
          </TouchableOpacity>       
        </BlurView>
      </View>
    </ImageBackground>
  );
}


