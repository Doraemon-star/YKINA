import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors'; 
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
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Frosted Glass Effect Container using BlurView */}
        <BlurView intensity={10} tint="light" style={styles.frostedGlass}>
          {/* Login Title */}
          <Text style={styles.loginTitle}>Login</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={styles.input.color}
              value={username}
              onChangeText={setUsername}
            />
            <Ionicons name="person" size={24} color={Colors.white.bright} style={styles.icon} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={styles.input.color}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Ionicons name="lock-closed" size={24} color={Colors.white.bright} style={styles.icon} />
          </View>

          {/* Remember Me and Forgot Password */}
          <View style={styles.row}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={handleRememberMe}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/login/forgotpassword')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push('/login/register')}>
            <Text style={styles.registerText}>Create a new account? Register</Text>
          </TouchableOpacity>
        </BlurView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  frostedGlass: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    alignItems: 'center',
    borderWidth: 0.5, 
    borderColor: Colors.white.bright,
    overflow: 'hidden', 
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    borderRadius: 25,
    paddingHorizontal: 15,
    borderWidth: 1, 
    borderColor: Colors.white.bright, 
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.black.text,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    backgroundColor: Colors.white.bright
  },
  checkboxText: {
    color: Colors.white.bright,
    fontSize: 15,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: Colors.black.text,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    backgroundColor: Colors.white.bright,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.black.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: Colors.white.bright,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
