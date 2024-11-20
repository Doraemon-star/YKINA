/**
 * Below are the styles that are used in the app.
 */

import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors'; 
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const YKINAStyle = StyleSheet.create ({
    imageIackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlayCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '95%',        
        padding: 10,
        marginTop: '15%',
        marginBottom: '5%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frostedGlass: {
        width: '85%',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        alignItems: 'center',
        borderWidth: 0.5, 
        borderColor: Colors.white.bright,
        overflow: 'hidden', 
    },
    currentStatusFrostedGlass: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderWidth: 0.5, 
        borderColor: Colors.white.bright,
        overflow: 'hidden', 
    },
    medicationItem: {
        flex:1,
        marginVertical: 10,
        padding: 10,
        width: '100%',  
    },
    medicationRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    frostedGlassHeader:{
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderWidth: 0.5, 
        borderColor: Colors.white.bright,
    },
    frostedGlassFooter:{
        flex:0.1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderWidth: 0.15, 
        borderColor: Colors.white.bright,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteContainer: {
        flex: 1 / 2, // Top half of the screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
    quoteText: {
    fontSize: 28,
    color: Colors.grey.text,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.black.title,
        marginBottom: 30,
    },
    title2nd: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black.title,
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 50,  
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderRadius: 25,
        paddingHorizontal: 15,
        borderWidth: 1, 
        borderColor: Colors.white.bright, 
    },
    dropdownContainer: {       
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderColor: Colors.green.text, 
    },
    dropdownItem: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    
    inputText: {
        flex:1,
        color: Colors.black.text,
        fontSize: 16,
    },
    inputIcon: {
        marginLeft: 10,
    },
    
    generalText: {
        color: Colors.black.text,
        fontSize: 15,
    },
    generalTextLarge: {
        color: Colors.black.text,
        fontSize: 18,
    },
    generalTextUnderline: {
        color: Colors.black.text,
        fontSize: 15,
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    medicationDetails: {
        fontSize: 14,
        marginVertical: 10,
    },
    medicationDetailsUnderline: {
        fontSize: 14,
        marginVertical: 10,
        textDecorationLine: 'underline',

    },
    saveEditUnderline: {
        color: Colors.green.text,
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 5,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    whiteButtonContainer: {
        backgroundColor: Colors.white.buttonContainer,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        alignSelf: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
    blackButtonText: {
        color: Colors.black.title,
        fontSize: 18,
        fontWeight: 'bold',
    },
    addNewRecordButton: {
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
    blackTextUnderline: {
        color: Colors.black.title,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export const diseaseSelectStyles = {
    inputIOSContainer:{...YKINAStyle.inputContainer},
    inputAndroidContainer:{...YKINAStyle.inputContainer},
    inputIOS: {
        ...YKINAStyle.inputText,
        
    },
    inputAndroid: {
        ...YKINAStyle.inputText,
       
    },
    placeholder: {
        color: Colors.black.text,
    },
    iconContainer: {
        right: 15,
    },
    
   
};

