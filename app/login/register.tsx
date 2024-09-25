import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors'; 
import YKINAStyle from '../../constants/Stylesheet'; 

import { Ionicons } from '@expo/vector-icons'; // For icons
import { BlurView } from 'expo-blur'; // Import BlurView for frosted glass effect
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [userName, setUsername] = useState(''); 
  const [kidName, setKidName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleRegister = async() => {
    if (!userName || !kidName || !email || !password || !confirmPassword ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://http://18.217.109.182/:1337/auth/local/register', {
        userName,
        kidName,
        email,
        password
      });

      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => router.push('/dashboard') }, // Redirect to dashboard
      ]);

    } catch (error) {
      // Handle errors, e.g., if the user is already registered
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  }



  return (
    <ImageBackground
      source={require('../../assets/images/image15.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlay}>
        {/* Frosted Glass Effect Container using BlurView */}
        <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>
          {/* Login Title */}
          <Text style={YKINAStyle.title}>Register</Text>

          {/* Input Fields */}
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Your Name"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={userName}
              onChangeText={setUsername}
            />
            <Ionicons name="people" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Kid Name"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={kidName}
              onChangeText={setKidName}
            />
            <Ionicons name="people" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
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
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Password"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Ionicons name="lock-closed" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Confirm Password"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Ionicons name="lock-closed" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={YKINAStyle.whiteButtonContainer} onPress={handleRegister}>
            <Text style={YKINAStyle.blackButtonText}>Sign Up</Text>
          </TouchableOpacity>

        </BlurView>
      </View>
    </ImageBackground>
  );
}


