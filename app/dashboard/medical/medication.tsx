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
import {YKINAStyle} from '@/constants/Stylesheet'; 
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '@/constants/Colors'; 
import api from '@/util/api';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

type medication= {
  drugname?: string,
  doseamount?: string,
  doseunit?: string,
  freq?: string,
  timeperiod?: string,
  startdate?: string,
  enddate?:string,
  status?: string,
  medDocumentId?: string,
}
export default function MedicationScreen() {

  //#region useState
  const [medications, setMedications] = useState<medication[]>([]);
  const [newMedication, setNewMedication] = useState<medication>({});
  const [editingMedication, setEditingMedication] = useState<medication | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(false);
  const [newRecord, setNewRecord]= useState(false);
  
  const [drugNames, setDrugNames] = useState<string[]>([]);
  const [drugUnits, setDrugUnits] = useState<string[]>([]);
  const [timePeriods, setTimePeriods] = useState<string[]>([]);

  const [isFocusDrugName, setIsFocusDrugName] = useState(false);
  const [isFocusDoseUnit, setIsFocusDoseUnit] = useState(false);
  const [isFocusTimePeriod, setIsFocusTimePeriod] = useState(false);

  const [selectedDrugName, setSelectedDrugName] = useState('');
  const [selectedDoseUnit, setSelectedDoseUnit] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(''); 

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  //#endregion

  const fetchDrugNames = async () => {
    try {
      const apiInstance = await api();
      const allDrugNames = await apiInstance.getAllDrugNames();
      const formattedData = allDrugNames.map((item) => ({
        label: item,
        value: item 
    }));
      setDrugNames(formattedData); 
    } catch (error) {
      console.error('Error fetching drug names:', error);
    }
  };

  const fetchMedications = async () => {
    try {
      const apiInstance = await api();
      const allDrugUnits = await apiInstance.getAllMedications();
      const formattedData = allDrugUnits.map((item) => ({
        drugname: item.drug.drugName,
        doseamount: item.doseAmount,
        doseunit: item.doseUnit,
        freq: item.frequency,
        timeperiod: item.timePeriod,
        startdate: item.startDate,
        enddate:item.endDate,
        status: item.endDate ? 'Inactive' : 'Active',
        medDocumentId: item.documentId,
      }));
      setMedications(formattedData); 
    } catch (error) {
      console.error('Error fetching all medications:', error);
    }
  };

  const fetchDrugUnits = async () => {
    try {
      const apiInstance = await api();
      const allDrugUnits = await apiInstance.getAllDrugUnits();
      const formattedData = allDrugUnits.map((item) => ({
        label: item,
        value: item 
      }));
      setDrugUnits(formattedData); 
    } catch (error) {
      console.error('Error fetching drug units:', error);
    }
  };
  const fetchTimePeriods = async () => {
    try {
      const apiInstance = await api();
      const allTimePeriods = await apiInstance.getAllTimePeriods();
      const formattedData = allTimePeriods.map((item) => ({
        label: item,
        value: item 
      }));
      setTimePeriods(formattedData); 
    } catch (error) {
      console.error('Error fetching drug units:', error);
    }
  };

  useEffect(() => { 
    fetchDrugNames();
    fetchDrugUnits();
    fetchTimePeriods();
    fetchMedications();
  }, []);

  // Handle filtering the drug list based on input
  

  const handleNew = () => {
        setModalVisible(true);
        setNewRecord(true);
        setEditRecord(false);
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
              if (medication) {
                setEditingMedication(medication);
                setModalVisible(true);
                setEditRecord(true);
                setNewRecord(false);
              } else {
                console.error("Invalid medication object");
              }
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
  const handleSave = () => {
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
          <Text style={YKINAStyle.medicationName}>{item.drugname}</Text>
          <Text style={YKINAStyle.blackButtonText}>{item.status}</Text>
        </View> 

        <View style={YKINAStyle.medicationRowContainer}>
          <Text style={YKINAStyle.medicationDetails}>{item.doseamount} {item.doseunit}</Text>
          <Text style={YKINAStyle.medicationDetails}>{item.freq}/{item.timeperiod}</Text>  
          <TouchableOpacity onPress={() => handleEdit(item)} >
            <Text style={YKINAStyle.medicationDetailsUnderline}>edit</Text>
          </TouchableOpacity>     
          <TouchableOpacity onPress={() =>handleDelete(item.medDocumentId)} >
            <Text style={YKINAStyle.medicationDetailsUnderline}>delete</Text>
          </TouchableOpacity>     
        </View>
      </BlurView>
  );

  //#region date picker
  const endDatePicker = () => {
    setShowEndDatePicker(true);
  };
  const startDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const onStartDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  //#endregion
   
  const inputText = {
    ...YKINAStyle.inputText, 
    flex: undefined, 
  };

  return (
    <ImageBackground source={require('@/assets/images/image25.png')} style={YKINAStyle.imageIackground}>
      <View style={YKINAStyle.overlayCenter}>
        <View style = {YKINAStyle.container}>
          <FlatList
              data={medications}
              renderItem={renderMedication}
              keyExtractor={(item) => item.medDocumentId.toString()}    
              style={{ flex: 1, width: '100%' }}       
          />
          
          <Modal visible={isModalVisible} animationType="slide">
              <ImageBackground source={require('@/assets/images/image16.png')} style={YKINAStyle.imageIackground}>
                <View style={YKINAStyle.overlayCenter}>
                  <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>              
                    <Dropdown
                      style={[YKINAStyle.inputContainer, isFocusDrugName && { borderColor: Colors.green.text }]}
                      placeholderStyle={[inputText,{color:'#A9A9A9'}]}
                      selectedTextStyle={inputText}
                      inputSearchStyle={inputText}
                      containerStyle = {YKINAStyle.dropdownContainer}
                      data={drugNames}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={
                        !isFocusDrugName 
                          ? (
                              editRecord 
                                ? editingMedication?.drugname 
                                : (newRecord ? 'Select medication' : '...')
                            )
                          : '...'
                      }
                      searchPlaceholder="Search..."
                      value={selectedDrugName}
                      onFocus={() => setIsFocusDrugName(true)}
                      onBlur={() => setIsFocusDrugName(false)}
                      onChange={item => {
                        setSelectedDrugName(item.value);
                        setIsFocusDrugName(false);
                      }}               
                    />
                  
                    <View style={YKINAStyle.medicationRowContainer}>
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder={editRecord ? editingMedication?.doseamount:"Dose Amount"}
                            value={editRecord ? editingMedication?.doseamount:newMedication.doseamount}
                            keyboardType="numeric"
                            onChangeText={(text) =>{
                              editRecord? setEditingMedication({ ...editingMedication, doseamount: text })
                              :setNewMedication({ ...newMedication, doseamount: text })

                            } }
                            style={inputText}
                        />
                      </View>
                      <Dropdown
                        style={[YKINAStyle.inputContainer, {width: "45%"}, isFocusDoseUnit && { borderColor: Colors.green.text }]}
                        placeholderStyle={[inputText,{color:'#A9A9A9'}]}
                        selectedTextStyle={inputText}
                        inputSearchStyle={inputText}
                        containerStyle = {YKINAStyle.dropdownContainer}
                        data={drugUnits}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={
                          !isFocusDoseUnit 
                            ? (
                                editRecord 
                                  ? editingMedication?.doseunit 
                                  : (newRecord ? 'Select unit' : '...')
                              )
                            : '...'
                        }
                        searchPlaceholder="Search..."
                        value={selectedDoseUnit}
                        onFocus={() => setIsFocusDoseUnit(true)}
                        onBlur={() => setIsFocusDoseUnit(false)}
                        onChange={item => {
                          setSelectedDoseUnit(item.value);
                          setIsFocusDoseUnit(false);
                        }}               
                      />
                    </View>

                    <View style={YKINAStyle.medicationRowContainer}>
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder={editRecord ? editingMedication?.freq:"Frequency"}
                            value={editRecord ? editingMedication?.freq:newMedication.freq}
                            onChangeText={(text) => {
                              editRecord? setEditingMedication({ ...editingMedication, freq: text })
                              :setNewMedication({ ...newMedication, freq: text })

                            } }
                            style={inputText}
                        />
                      </View>
                      <Dropdown
                        style={[YKINAStyle.inputContainer, {width: "45%"}, isFocusTimePeriod && { borderColor: Colors.green.text }]}
                        placeholderStyle={[inputText,{color:'#A9A9A9'}]}
                        selectedTextStyle={inputText}
                        inputSearchStyle={inputText}
                        containerStyle = {YKINAStyle.dropdownContainer}
                        data={timePeriods}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={
                          !isFocusTimePeriod 
                            ? (
                                editRecord 
                                  ? editingMedication?.timeperiod
                                  : (newRecord ? 'Select item' : '...')
                              )
                            : '...'
                        }
                        searchPlaceholder="Search..."
                        value={selectedTimePeriod}
                        onFocus={() => setIsFocusTimePeriod(true)}
                        onBlur={() => setIsFocusTimePeriod(false)}
                        onChange={item => {
                          setSelectedTimePeriod(item.value);
                          setIsFocusTimePeriod(false);
                        }}               
                      />
                    </View>

                    <View style={YKINAStyle.inputContainer}>
                      <TextInput
                        style={inputText}
                        placeholder={
                          !isFocusDoseUnit 
                            ? (
                                editRecord 
                                  ? editingMedication?.startdate
                                  : (newRecord ? 'Start Date' : '...')
                              )
                            : '...'
                        }                        
                        onChangeText={onStartDateChange}
                        secureTextEntry
                        onPress = {startDatePicker}
                      />
                                            
                      {showStartDatePicker && (
                        <DateTimePicker
                          value={endDate || new Date()} // Use endDate if available; otherwise, show nothing
                          mode="date"
                          display="default"
                          onChange={onStartDateChange}
                        />
                      )}
                    </View>
                    <View style={YKINAStyle.inputContainer}>
                      <TextInput
                        style={inputText}

                        placeholder={
                          !isFocusDoseUnit 
                            ? (
                                editRecord 
                                  ? editingMedication?.enddate 
                                  : (newRecord ? 'End Date' : '...')
                              )
                            : '...'
                        }                                                  
                        onChangeText={onEndDateChange}
                        secureTextEntry
                        onPress = {endDatePicker}
                      />
                                            
                      {showEndDatePicker && (
                        <DateTimePicker
                          value={endDate || new Date()} // Use endDate if available; otherwise, show nothing
                          mode="date"
                          display="default"
                          onChange={onEndDateChange}
                        />
                      )}
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <Button title="Save" onPress={handleSave} />
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
              onPress={() => handleNew()}  // Opens the modal for adding new medication
              style={YKINAStyle.addNewRecordButton}
            >
              <Ionicons name="add" size={30} color={Colors.white.bright}/>
              </TouchableOpacity>
          </BlurView>

      </View>
      
    </ImageBackground>
  );
};




