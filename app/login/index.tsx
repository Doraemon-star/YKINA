import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors'; 
import {YKINAStyle} from '../../constants/Stylesheet'; 
import { Ionicons } from '@expo/vector-icons'; 
import { BlurView } from 'expo-blur'; 
import {singin} from '../../util/api'; 


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    const response = await singin(email, password);
    if (response?.sucess) {
      router.push('/dashboard');
    }else{
      Alert.alert('Error', response?.message);
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/image22.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlay}>
        {/* Frosted Glass Effect Container using BlurView */}
        <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>
          {/* Login Title */}
          <Text style={YKINAStyle.title}>Login</Text>

          {/* Input Fields */}
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons name="person" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Ionicons name="lock-closed" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>

          {/* Remember Me and Forgot Password */}       
          <TouchableOpacity onPress={() => router.push('/login/forgotpassword')}>
            <Text style={YKINAStyle.generalTextUnderline}>Forgot Password?</Text>
          </TouchableOpacity>
          
          {/* Login Button */}
          <TouchableOpacity style={YKINAStyle.whiteButtonContainer} onPress={handleLogin}>
            <Text style={YKINAStyle.blackButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push('/login/register')}>
            <Text style={YKINAStyle.blackTextUnderline}>Create a new account? Register</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ImageBackground>
  );
}


