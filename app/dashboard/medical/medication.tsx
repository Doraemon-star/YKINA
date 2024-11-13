import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Alert,
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
  medDocumentId?: string
}

export default function MedicationScreen() {

  //#region useState
  const [medications, setMedications] = useState<medication[]>([]);
  const [editingMedication, setEditingMedication] = useState<medication | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(false);
  const [newRecord, setNewRecord]= useState(false);
  
  // Dropdown lists
  const [drugNames, setDrugNames] = useState<{label:string;value:number}[]>([]);
  const [drugUnits, setDrugUnits] = useState<{label:string;value:number}[]>([]);
  const [timePeriods, setTimePeriods] = useState<{label:string;value:number}[]>([]);

  // Dropdown lists focus
  const [isFocusDrugName, setIsFocusDrugName] = useState(false);
  const [isFocusDoseUnit, setIsFocusDoseUnit] = useState(false);
  const [isFocusTimePeriod, setIsFocusTimePeriod] = useState(false);

  // Medication fields
  const [selectedDrugName, setSelectedDrugName] = useState('');
  const [doseAmount, setDoseamount] = useState('');
  const [selectedDoseUnit, setSelectedDoseUnit] = useState('');
  const [freq, setFreq] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //#endregion

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const apiInstance = await api();
        const [allDrugNames, allDrugUnits, allTimePeriods, allMedications] = await Promise.all([
          apiInstance.getAllDrugNames(),
          apiInstance.getAllDrugUnits(),
          apiInstance.getAllTimePeriods(),
          apiInstance.getAllMedications(),
        ]);
        const formattedMedications = allMedications.map(item => ({
          drugname: item.drugName,
          doseamount: item.doseAmount,
          doseunit: item.doseUnit,
          freq: item.frequency,
          timeperiod: item.timePeriod,
          startdate: item.startDate,
          enddate: item.endDate,
          status: item.endDate ? 'Inactive' : 'Active',
          medDocumentId: item.documentId,
        }));
  
        setDrugNames(allDrugNames);
        setDrugUnits(allDrugUnits);
        setTimePeriods(allTimePeriods);
        setMedications(formattedMedications);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAllData();
  }, []);
  

  // Handle New
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
                setSelectedDrugName(medication.drugname || '');
                setDoseamount(medication.doseamount || '');
                setSelectedDoseUnit(medication.doseunit || '');
                setFreq(medication.freq || '');
                setSelectedTimePeriod(medication.timeperiod || '');
                setStartDate(medication.startdate ? medication.startdate : '');
                setEndDate(medication.enddate ? medication.enddate : '');
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

  const resetForm = () => {
    setSelectedDoseUnit('');
    setSelectedDrugName('');
    setDoseamount('');
    setFreq('');
    setSelectedTimePeriod('');
    setStartDate('');
    setEndDate('');
    setEditingMedication(null);
    setModalVisible(false);
    setNewRecord(false);
    setEditRecord(false);
  };

  // Handle Save Edit
  const handleSave = async () => {
    try {
      const apiInstance = await api();
      if (newRecord) {
        await apiInstance.newMedication(
          selectedDrugName, 
          doseAmount, 
          selectedDoseUnit, 
          freq, 
          selectedTimePeriod, 
          startDate, 
          endDate
        );
      } else if (editRecord && editingMedication) {
        await apiInstance.updateMedication(
          selectedDrugName,
          doseAmount,
          selectedDoseUnit,
          freq,
          selectedTimePeriod,
          startDate,
          endDate,
          editingMedication.medDocumentId
        );
      }
    } catch (error) {
      console.error('Error saving medication:', error);
    }
    resetForm();
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
  const onStartDateChange = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      const date = formatDate(selectedDate);
      setStartDate(date);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      const date = formatDate(selectedDate);
      setEndDate(date);
    }
  };

  // Format the selected date to a readable format (e.g., "MM/DD/YYYY")
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
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
              keyExtractor={(item) => item.medDocumentId!.toString()}    
              style={{ flex: 1, width: '100%' }}       
          />
          
          <Modal visible={isModalVisible} animationType="slide">
              <ImageBackground source={require('@/assets/images/image16.png')} style={YKINAStyle.imageIackground}>
                <View style={YKINAStyle.overlayCenter}>
                  <BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlass}>  

                    {/* Medication Names */}            
                    <Dropdown 
                      style={[YKINAStyle.inputContainer, isFocusDrugName && { borderColor: Colors.green.text }]}
                      placeholderStyle={[inputText,{color: editRecord ? 'black' : '#A9A9A9' }]}
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
                        setSelectedDrugName(item.label);
                        setIsFocusDrugName(false);
                      }}               
                    />

                    {/* Units */}
                    <View style={YKINAStyle.medicationRowContainer}> 
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder={editRecord ? editingMedication?.doseamount:"Dose Amount"}
                            value={editRecord ? editingMedication?.doseamount:doseAmount}
                            keyboardType="numeric"
                            onChangeText={(text) =>{setDoseamount(text)} }
                            style={inputText}
                        />
                      </View>
                      <Dropdown
                        style={[YKINAStyle.inputContainer, {width: "45%"}, isFocusDoseUnit && { borderColor: Colors.green.text }]}
                        placeholderStyle={[inputText,{color: editRecord ? 'black' : '#A9A9A9' }]}
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
                                  : 'Select unit'
                              )
                            : '...'
                        }
                        searchPlaceholder="Search..."
                        value={selectedDoseUnit}
                        onFocus={() => setIsFocusDoseUnit(true)}
                        onBlur={() => setIsFocusDoseUnit(false)}
                        onChange={item => {
                          setSelectedDoseUnit(item.label);
                          setIsFocusDoseUnit(false);
                        }}               
                      />
                    </View>

                    {/*Frequency*/}
                    <View style={YKINAStyle.medicationRowContainer}> 
                      <View style={[YKINAStyle.inputContainer, {width: "45%",marginRight: 10}]}>
                        <TextInput
                            placeholder={editRecord ? editingMedication?.freq:"Frequency"}
                            value={editRecord ? editingMedication?.freq:freq}
                            onChangeText={(text) => {setFreq(text)}}
                            style={inputText}
                        />
                      </View>
                      <Dropdown
                        style={[YKINAStyle.inputContainer, {width: "45%"}, isFocusTimePeriod && { borderColor: Colors.green.text }]}
                        placeholderStyle={[inputText,{color: editRecord ? 'black' : '#A9A9A9' }]}
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
                                  : 'Select freq' 
                              )
                            : '...'
                        }
                        searchPlaceholder="Search..."
                        value={selectedTimePeriod}
                        onFocus={() => setIsFocusTimePeriod(true)}
                        onBlur={() => setIsFocusTimePeriod(false)}
                        onChange={item => {
                          setSelectedTimePeriod(item.label);
                          setIsFocusTimePeriod(false);
                        }}               
                      />
                    </View>

                    {/*Start Date*/}
                    <View style={YKINAStyle.inputContainer}>  
                    <TouchableOpacity>
                        <TextInput
                          style={inputText}
                          value={startDate} // Show formatted date if selected
                          placeholder={
                            editRecord 
                              ? (editingMedication?.startdate ? editingMedication.startdate : 'Start Date') 
                              : 'Start Date'
                          }
                          placeholderTextColor={editRecord ? 'black' : '#A9A9A9'}
                          editable={false} // Prevent manual input
                          pointerEvents="none" // Prevent keyboard from appearing
                        />
                      </TouchableOpacity>                                                          
                      <DateTimePicker
                        value={new Date()} 
                        mode="date"
                        display="default"
                        onChange={onStartDateChange}
                      />                  
                    </View>

                    {/*End Date*/}
                    <View style={YKINAStyle.inputContainer}> 
                      <TouchableOpacity>
                        <TextInput
                          style={inputText}
                          value={endDate} // Show formatted date if selected
                          placeholder={
                            editRecord 
                              ? (editingMedication?.enddate ? editingMedication.enddate : 'End Date') 
                              : 'End Date'
                          }
                          placeholderTextColor={editRecord ? 'black' : '#A9A9A9'}
                          editable={false} // Prevent manual input
                          pointerEvents="none" // Prevent keyboard from appearing
                        />
                      </TouchableOpacity>                                    
                      <DateTimePicker
                        value={new Date()} 
                        display="default"
                        onChange={onEndDateChange}
                      />   
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




