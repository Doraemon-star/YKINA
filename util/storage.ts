// util/storage.tx

import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
  // Function to store data
  setItem: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  },

  // Function to retrieve data. Usage:
  getItem: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  },

  // Function to remove data
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  },

  // Function to clear all data
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  },

  isJWTvalid: async (jwt: string): Promise<boolean> => {
    try {
      if (jwt != null) {
        const { expiry } = JSON.parse(jwt);
        // Return true if the token is not expired
        return Date.now() <= expiry;
      }
      return false; // No token found, therefore not valid
    } catch (e) {
      console.error('Error checking token validity:', e);
      return false; // Assume not valid if error occurs
    }
  },

};

export default AsyncStorageService;
