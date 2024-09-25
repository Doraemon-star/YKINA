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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Handle Remember Me functionality
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    // Save username logic if Remember Me is checked
    if (!rememberMe) {
      // Save username for next login
    }
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
          <Text style={YKINAStyle.title}>Login</Text>

          {/* Input Fields */}
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Username"
              placeholderTextColor={YKINAStyle.inputText.color}
              value={username}
              onChangeText={setUsername}
            />
            <Ionicons name="person" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
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

          {/* Remember Me and Forgot Password */}
          <View style={YKINAStyle.row}>
            <View style={YKINAStyle.checkboxContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={handleRememberMe}
                style={YKINAStyle.checkbox}
              />
              <Text style={YKINAStyle.checkboxText}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/login/forgotpassword')}>
              <Text style={YKINAStyle.generalTextUnderline}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={YKINAStyle.whiteButtonContainer}>
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


