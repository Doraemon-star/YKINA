import React from 'react';
import { BlurView } from 'expo-blur';
import Colors from '../../constants/Colors'; 
import YKINAStyle from '../../constants/Stylesheet'; 

const YKINAHeaderOptions =  {
  headerTitle: '', 
  headerTintColor: Colors.black.title,
  headerBackTitleStyle: YKINAStyle.blackButtonText,
  headerTransparent:true,
  headerBackTitleVisible: true,
  headerBackground:()=>(<BlurView intensity={10} tint="light" style={YKINAStyle.frostedGlassHeader}/>),
};

export default YKINAHeaderOptions;
