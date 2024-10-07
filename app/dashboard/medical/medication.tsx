import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import { BlurView } from 'expo-blur'; 
import Autocomplete from 'react-native-autocomplete-input';
import {YKINAStyle} from '@/constants/Stylesheet'; 
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '@/constants/Colors'; 
import api from '@/util/api'

export default function MedicationScreen() {
  // Hardcoded fake medication list for testing
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Aspirin',
      doseAmount: '100',
      doseUnit: 'mg',
      frequency: 'Once a day',
      timePeriod: '30 days',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Lisinopril',
      doseAmount: '20',
      doseUnit: 'mg',
      frequency: 'Twice a day',
      timePeriod: '90 days',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Metformin',
      doseAmount: '500',
      doseUnit: 'mg',
      frequency: 'Three times a day',
      timePeriod: '60 days',
      status: 'Stopped',
    },
    {
      id: 4,
      name: 'Simvastatin',
      doseAmount: '40',
      doseUnit: 'mg',
      frequency: 'Once a day',
      timePeriod: '120 days',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Amoxicillin',
      doseAmount: '250',
      doseUnit: 'mg',
      frequency: 'Three times a day',
      timePeriod: '7 days',
      status: 'Active',
    },
    {
      id: 6,
      name: 'test1',
      doseAmount: '250',
      doseUnit: 'mg',
      frequency: 'Three times a day',
      timePeriod: '7 days',
      status: 'Active',
    },
    {
      id: 7,
      name: 'test2',
      doseAmount: '250',
      doseUnit: 'mg',
      frequency: 'Three times a day',
      timePeriod: '7 days',
      status: 'Active',
    },
    
  ]);
  const [editingMedication, setEditingMedication] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    doseAmount: '',
    doseUnit: '',
    frequency: '',
    timePeriod: '',
    startDate: '',
    endDate:'',
    status: '',
  });
  const [drugNames, setDrugNames] = useState<string[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchDrugNames = async () => {
      try {
        const apiInstance = await api();
        const allDrugNames = await apiInstance.getAllDrugNames();
        setDrugNames(allDrugNames); 
      } catch (error) {
        console.error('Error fetching drug names:', error);
      }
    };
    fetchDrugNames();
  }, []);

  // Handle filtering the drug list based on input
  const handleDrugSearch = (input) => {
    if (input) {
      const filtered = drugNames.filter((name:string) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredDrugs(filtered);
    } else {
      setFilteredDrugs([]);
    }
    setQuery(input); 
    setNewMedication({ ...newMedication, name: input }); 
  };

  // Handle Edit
  const handleEdit = (medication) => {
    Alert.alert(
        "Edit Medication",
        "If your physician adjusts the dose, frequency, etc., please add an end date to this record and create a new record for the adjustment; otherwise, you may lose this record.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
                setEditingMedication(medication);
                setModalVisible(true);
            },
          },
        ]
      );
    
  };

  // Handle Delete
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication? The data cannot be recovered after deletion.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setMedications((prevMedications) =>
              prevMedications.filter((med) => med.id !== id)
            );
          },
        },
      ]
    );
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    setMedications((prevMedications) =>
      prevMedications.map((med) =>
        med.id === editingMedication.id ? newMedication : med
      )
    );
    setModalVisible(false);
    setEditingMedication(null);
  };

  // Render Medication Item
  const renderMedication = ({ item }) => (
      <BlurView
        style={YKINAStyle.medicationItem}
        intensity={50} 
        tint="light" 
      > 
        <View style={YKINAStyle.medicationRowContainer}>
          <Text style={YKINAStyle.medicationName}>{item.name}</Text>
          <Text style={YKINAStyle.blackButtonText}>{item.status}</Text>
        </View> 

        <View style={YKINAStyle.medicationRowContainer}>
          <Text style={YKINAStyle.medicationDetails}>{item.doseAmount} {item.doseUnit}</Text>
          <Text style={YKINAStyle.medicationDetails}>{item.frequency}</Text>  
          <TouchableOpacity onPress={() => handleEdit(item)} >
            <Text style={YKINAStyle.medicationDetailsUnderline}>edit</Text>
          </TouchableOpacity>     
          <TouchableOpacity onPress={() =>handleDelete(item.id)} >
            <Text style={YKINAStyle.medicationDetailsUnderline}>delete</Text>
          </TouchableOpacity>     
        </View>
      </BlurView>
  );

  return (
    <ImageBackground source={require('@/assets/images/image25.png')} style={YKINAStyle.imageIackground}>
      <View style={YKINAStyle.overlayCenter}>
        <View style = {YKINAStyle.container}>
          <FlatList
              data={medications}
              renderItem={renderMedication}
              keyExtractor={(item) => item.id.toString()}    
              style={{ flex: 1, width: '100%' }}       
          />
          

          <Modal visible={isModalVisible} animationType="slide">
              <ImageBackground source={require('@/assets/images/image16.png')} style={YKINAStyle.imageIackground}>
                <View style={YKINAStyle.overlayCenter}>
                  <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>

                    <View style={YKINAStyle.inputContainer}>
                    <Autocomplete
                      data={filteredDrugs}
                      defaultValue={query}
                      onChangeText={handleDrugSearch}
                      placeholder="Medication Name"
                      flatListProps={{
                        renderItem: ({ item }) => (
                          <TouchableOpacity onPress={() => {
                            setQuery(item);
                            setNewMedication({ ...newMedication, name: item });
                          }}>
                            <Text style={YKINAStyle.generalText}>{item}</Text>
                          </TouchableOpacity>
                        ),
                        keyExtractor: (item) => item,
                        
                      }}
                    />
                    </View>

                    <View style={YKINAStyle.medicationRowContainer}>
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder="Dose Amount"
                            value={newMedication.doseAmount}
                            keyboardType="numeric"
                            onChangeText={(text) => setNewMedication({ ...newMedication, doseAmount: text })}
                            style={YKINAStyle.inputText}
                        />
                      </View>
                      <View style={[YKINAStyle.inputContainer, {width: "45%"}]}>
                        <TextInput
                            placeholder="Dose Unit"
                            value={newMedication.doseUnit}
                            onChangeText={(text) => setNewMedication({ ...newMedication, doseUnit: text })}
                            style={YKINAStyle.inputText}
                        />
                      </View>
                    </View>

                    <View style={YKINAStyle.medicationRowContainer}>
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder="Frequency"
                            value={newMedication.frequency}
                            onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
                            style={YKINAStyle.inputText}
                        />
                      </View>
                      <View style={[YKINAStyle.inputContainer, {width: "45%"}]}>
                        <TextInput
                            placeholder="day"
                            value={newMedication.frequency}
                            onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
                            style={YKINAStyle.inputText}
                        />
                      </View>
                    </View>

                    <View style={YKINAStyle.inputContainer}>
                      <TextInput
                          placeholder="Start Date"
                          value={newMedication.timePeriod}
                          onChangeText={(text) => setNewMedication({ ...newMedication, startDate: text })}
                          style={YKINAStyle.inputText}
                      />
                    </View>
                    <View style={YKINAStyle.inputContainer}>
                      <TextInput
                          placeholder="End Date"
                          value={newMedication.endDate}
                          onChangeText={(text) => setNewMedication({ ...newMedication, endDate: text })}
                          style={YKINAStyle.inputText}
                      />
                    </View>
                    <View style={styles.modalButtons}>
                        <Button title="Save" onPress={handleSaveEdit} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                  </BlurView>
                </View>
              </ImageBackground>
          </Modal>
        </View>
        {/* Footer Container for "Add New Medicine" */}
        <BlurView
            style = {YKINAStyle.frostedGlassFooter}
            intensity={50}
            tint="light"
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true)}  // Opens the modal for adding new medication
              style={styles.addNewMedicineButton}
            >
              <Ionicons name="add" size={30} color={Colors.white.bright}/>
              </TouchableOpacity>
          </BlurView>

      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  addNewMedicineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: "80%",
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
});


