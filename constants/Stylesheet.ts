/**
 * Below are the styles that are used in the app.
 */

import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors'; 

export const YKINAStyle = StyleSheet.create ({
    imageIackground: {
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
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        alignItems: 'center',
        borderWidth: 0.5, 
        borderColor: Colors.white.bright,
        overflow: 'hidden', 
    },
    frostedGlassHeader:{
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderWidth: 0.5, 
        borderColor: Colors.white.bright,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.black.title,
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
    },
    inputText: {
        flex: 1,
        height: 50,
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
        color: Colors.black.text,
        fontSize: 15,
        //fontWeight: 'bold',
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
    blackTextUnderline: {
        color: Colors.black.title,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default YKINAStyle;