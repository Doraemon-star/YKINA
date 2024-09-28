import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../../constants/Colors'; 
import {YKINAStyle, diseaseSelectStyles} from '../../constants/Stylesheet'; 
import {register, getAllDiseaseNames} from '../../util/api'; 
import { Ionicons } from '@expo/vector-icons'; 
import { BlurView } from 'expo-blur'; 

export default function Register() {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [kidName, setKidname] = useState('');
  const [diseaseSelected, setDiseaseSelection] = useState('');
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false); 

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
          const response = await getAllDiseaseNames();
          const diseaseList = response.map(disease => ({
            label: disease,
            value: disease
          }))
          setDiseaseOptions(diseaseList); 
      } catch (error) {
          console.error("Error fetching disease names:", error);
          setDiseaseOptions([]);  // Fallback to an empty array in case of error
      }
  };
    fetchDiseases();
  }, []);
  
  const handleRegister = async() => {
    if (!userName || !kidName || !diseaseSelected || !email || !password || !confirmPassword ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    const response = await register(userName,kidName, diseaseSelected, email, password);

    if (response?.sucess) {
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => router.push('/dashboard') }, // Redirect to dashboard
      ]);
    }else{
      Alert.alert('Error', response?.message);
    } 
  };

  const togglePicker = () => {
    setIsPickerOpen(prev => !prev); 
  };
  

  return (
    <ImageBackground
      source={require('../../assets/images/image15.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlay}>
        {/* Frosted Glass Effect Container using BlurView */}
        <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>
          {/* Login Title */}

          {/* Input Fields */}
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Your Name"
              autoCapitalize="none"
              placeholderTextColor={Colors.black.text}
              value={userName}
              onChangeText={setUsername}
            />
            <Ionicons name="people" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Kid's Nick Name"
              autoCapitalize="none"
              placeholderTextColor={Colors.black.text}
              value={kidName}
              onChangeText={setKidname}
            />
            <Ionicons name="people" size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
          </View>
          <RNPickerSelect
            onValueChange={(value) => {setDiseaseSelection(value);  setIsPickerOpen(false);}}
            items={diseaseOptions}
            placeholder={{ label: 'Select a disease...', value: null }}
            onOpen={togglePicker}
            onClose={() => setIsPickerOpen(false)}
            style={diseaseSelectStyles}
            Icon={()=> (<Ionicons name={isPickerOpen ? "chevron-up" : "chevron-down"} size={24} color={Colors.white.bright} style={YKINAStyle.inputIcon} />
            )}
          />     
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor={Colors.black.text}
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons name="mail" size={24} color={Colors.white.bright}/>
          </View>
          <View style={YKINAStyle.inputContainer}>
            <TextInput
              style={YKINAStyle.inputText}
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor={Colors.black.text}
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
              autoCapitalize="none"
              placeholderTextColor={Colors.black.text}
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


