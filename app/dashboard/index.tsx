import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ImageBackground,TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {YKINAStyle} from '@/constants/Stylesheet'; 
import Colors from '@/constants/Colors'; 
import AsyncStorageService from '@/util/storage'; 


import { BlurView } from 'expo-blur'; 


export default function Dashboard() {
  const router = useRouter();
  const [kidName, setKidName] = useState('');

  // Navigation functions for each module
  const navigateToDiagnosis = () => {
    router.push('/dashboard/diagnosis'); // Navigate to the Diagnosis page
  };

  const navigateToMedication = () => {
    router.push('/dashboard/medication'); // Navigate to the Medication page
  };

  const navigateToFellowFighters = () => {
    router.push('/dashboard/matchlist'); // Navigate to the Fellow Fighters (Match) page
  };

  useEffect (() => {
    const getKidName = async () => {
      const kid_name = await AsyncStorageService.getItem("kidName");
      setKidName(kid_name);
    }
    getKidName();

  })

  return (
    <ImageBackground source={require('@/assets/images/image1.png')} style={YKINAStyle.imageIackground}>
      <View style={YKINAStyle.overlayCenter}>
        <Text style={YKINAStyle.title}>
          Hi, {kidName}! 
        </Text>
        {/* Diagnosis Module */}
          <TouchableOpacity style = {[YKINAStyle.frostedGlass, {backgroundColor:'rgba(102,169,201,0.6)',height: 60,justifyContent: 'center'}]} onPress={navigateToDiagnosis}>
            <Text style={YKINAStyle.blackButtonText}>Diagnosis</Text>
          </TouchableOpacity>

        {/* Medication Module */}
        <TouchableOpacity style = {[YKINAStyle.frostedGlass, {backgroundColor:'rgba(250, 210, 125,0.6)',height: 60,justifyContent: 'center'}]} onPress={navigateToMedication}>
          <Text style={YKINAStyle.blackButtonText}>Medication</Text>
        </TouchableOpacity>
        

        {/* Fellow Fighters Module */}
        <TouchableOpacity style = {[YKINAStyle.frostedGlass, {backgroundColor:'rgba(185,222,201,0.6)',height: 60,justifyContent: 'center'}]} onPress={navigateToFellowFighters}>
          <Text style={YKINAStyle.blackButtonText}>Fellow Fighters</Text>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});
