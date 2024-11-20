import React, { useEffect, useState } from 'react';
import { View, Text,ImageBackground,FlatList,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import {YKINAStyle} from '@/constants/Stylesheet'; 
import { BlurView } from 'expo-blur'; 
import api from '@/util/api';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '@/constants/Colors'; 



type  Fighter = {
    documentId:string, 
    kidname:string,
}

export default function Matchlist() {
    const [fellowFighters, setFellowfighters] = useState<Fighter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {   
        const fetchFellowFighters = async () => {
          try {
            const apiInstance = await api();
            const fellow_fighters = await apiInstance.getFellowFighters();
            setFellowfighters(fellow_fighters);
            //console.log("fellow_fighters",fellow_fighters);
          } catch (error) {
            console.error('Error fetching fellow fighters:', error);
          }finally {
            setLoading(false); // Fetching is done
        }
        };
        fetchFellowFighters();
    }, []);
    
    const handleAdd = (fighter:Fighter) => {
        Alert.alert( "Request Sent!");    
      };

    const renderFighters = ({ item }: { item: Fighter }) => (
        <BlurView style={YKINAStyle.medicationItem} intensity={70} tint="light" > 
        <View style={YKINAStyle.medicationRowContainer}>
            <Text style={YKINAStyle.medicationName}>{item.kidname}</Text>
            <TouchableOpacity
              onPress={() => handleAdd(item)}  // Opens the modal for adding new medication            
            >
              <Ionicons name="add" size={30} color={Colors.black.text}/>
            </TouchableOpacity>
        </View> 
        </BlurView>
    );

  

  return (  
    <ImageBackground source={require('@/assets/images/image19.png')} style={YKINAStyle.imageIackground}>
        <View style={YKINAStyle.overlayCenter}>
        <View style = {[YKINAStyle.container, {justifyContent: 'center', alignItems: 'center'}]}>
            {loading ? (  
                <ActivityIndicator size="large" color={Colors.blue.background} />
            ) :fellowFighters.length > 0 ? (
              <FlatList
                  data={fellowFighters}
                  renderItem={renderFighters}
                  keyExtractor={(item) => item.documentId as string}
                  style={{ flex: 1, width: '100%' }}
              />
            ) : (
              <Text style={YKINAStyle.quoteText}>
                  We couldn't find any fellow fighters. But don't worry, YKINA is always here for you!
              </Text>
            )}
        </View>
        </View>
        
    </ImageBackground>
  );
}

