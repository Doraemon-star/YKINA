// app/dashboard/medical/diagnosis.tsx
import React , { useState,useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors'; 
import { BlurView } from 'expo-blur'; 
import {YKINAStyle} from '@/constants/Stylesheet'; 
import AsyncStorageService from '@/util/storage'; 
import api from '@/util/api'
import {decryptMessage} from '@/util/api';

export default function DiagnosisScreen() {
  const [userId, setUserId] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [decryptedDiseaseName, setDecryptedDiseaseName] = useState('');
  const [diseaseIntroduction, setDiseaseIntroduction] = useState('');
  const [kidName, setKidName] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [diseaseNameEditing, setDiseaseNameEditing] = useState(false);  
  const [statusEditing, setStatusEditing] = useState(false);  
  const [editedStatus, setEditedStatus] = useState(currentStatus);
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUserId, fetchedDiseaseName, fetchedKidName,fetchedCurrentStatus] = await Promise.all([
          AsyncStorageService.getItem('userId'),
          AsyncStorageService.getItem('diseaseName'),
          AsyncStorageService.getItem('kidName'),
          AsyncStorageService.getItem('currentStatus')
        ]);
        const apiInstance = await api();
        const decrypted_disease_name = await decryptMessage(fetchedDiseaseName);
        const disease_Introduction = await apiInstance.getDiseaseIntroduction(decrypted_disease_name);

        // Set the fetched data into the state
        setUserId(fetchedUserId || '');
        setDiseaseName(fetchedDiseaseName || '');
        setDecryptedDiseaseName(decrypted_disease_name);
        setDiseaseIntroduction(disease_Introduction || '');
        setKidName(fetchedKidName || '');
        setCurrentStatus(fetchedCurrentStatus || '');
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data from storage');
      }
    };
    fetchData();
  }, []);

 
  const saveStatus = async () => {
    try {
      setCurrentStatus(editedStatus);
  
      setStatusEditing(false);
  
      const apiInstance = await api();
      await apiInstance.updateCurrentStatus(userId, editedStatus);
  
      Alert.alert('Success', 'Current status updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update the current status');
    }
  };
  
   
  return (
    <ImageBackground
      source={require('@/assets/images/image30.png')} // Replace with your own image
      style={YKINAStyle.imageIackground}
    >
      <View style={YKINAStyle.overlayCenter}>
        {/* Diagnosis Fields */}
        <View style = {YKINAStyle.container}>
          <Text style={YKINAStyle.title2nd}>Diagnosis</Text>
          {diseaseName==='Other' && !diseaseNameEditing && (
            <TouchableOpacity onPress={(() => setDiseaseNameEditing(true))}>
              <Text style={YKINAStyle.saveEditUnderline}>Edit</Text>
            </TouchableOpacity>
          )}
          {diseaseNameEditing ? (
              <View style = {YKINAStyle.currentStatusContainer}>
                <TextInput 
                  value={diseaseNewName}
                  onChangeText={setDiseaseNewName}
                  placeholder={'Please tell us what disease that your kid is fighting for.'}
                  style={YKINAStyle.inputText}
                  multiline = {true}
                />
                {/* Save Button */}
                <TouchableOpacity
                  onPress={saveStatus}
                >
                  <Text style={YKINAStyle.saveEditUnderline}>save</Text>
                </TouchableOpacity>                  
              </View>
            ): (
              <Text style={YKINAStyle.generalTextLarge}>{decryptedDiseaseName}</Text>
          )}
          <Text>{"\n"}</Text>

          <Text style={YKINAStyle.title2nd}>Introduction</Text>
          <Text style={YKINAStyle.generalText}>{diseaseIntroduction}</Text>
          <Text>{"\n"}</Text>
          
          {/* Current Status Fields */}
          <Text style={YKINAStyle.title2nd}>{kidName}'s Current Status</Text>

          {/*Edit button */}
          {!statusEditing && (
            <TouchableOpacity onPress={(() => setStatusEditing(true))}>
              <Text style={YKINAStyle.saveEditUnderline}>Edit</Text>
            </TouchableOpacity>
          )}

          {/*Current Status Display */}
          
          {statusEditing ? (
            <BlurView intensity={10} tint="light" style={YKINAStyle.currentStatusFrostedGlass}>
              <View style = {{flex:1}}>
                <TextInput 
                  value={editedStatus}
                  onChangeText={setEditedStatus}
                  placeholder={currentStatus}
                  placeholderTextColor={YKINAStyle.inputText.color}
                  style={YKINAStyle.inputText}
                  multiline = {true}
                />                             
              </View>

              {/* Save Button */}
              <TouchableOpacity 
                onPress={saveStatus}
                style={{
                  position: 'absolute', // Absolute positioning
                  bottom: 10, 
                  right: 10, 
                }}
              >
                <Text style={YKINAStyle.saveEditUnderline}>save</Text>
              </TouchableOpacity>   
            </BlurView>
            
          ): (
            <Text style={YKINAStyle.generalText}>{currentStatus}</Text>
          )}
          
        </View> 
      </View>
    </ImageBackground>
  );
}
