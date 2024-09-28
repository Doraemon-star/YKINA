// util//api.ts
import axios from 'axios';
import AsyncStorageService from '../util/storage'; 

// get authtoken, finish getalldiseasenames api, finish register page, test api.

const authToken = AsyncStorageService.getItem("jwtToken");

export const register = async (username: string, kidName: string, diseaseName: string, email: string, password: string) => {       
    try {
        const response = await axios.post('http://18.217.109.182:1337/api/auth/local/register', {
            username: username,
            kidname:kidName,
            disease: diseaseName,
            email: email,
            password: password
        });
        if (response.status === 200) {
            return {
            sucess:true,
            message: "Registration successful!"
            };
        }
    
    } catch (error) {
        return {
            sucess: false,
            message:error.message
        }
    }      
}

export const singin = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://18.217.109.182:1337/api/auth/local', {
            identifier: email,
            password: password
        });
        const user = response.data;
        await AsyncStorageService.setItem('jwtToken', response.data.jwt);
        await AsyncStorageService.setItem('email', response.data.user.email);
        await AsyncStorageService.setItem('id', response.data.user.id);
        await AsyncStorageService.setItem('username', response.data.user.username);
        await AsyncStorageService.setItem('kidname', response.data.user.kidname);
        await AsyncStorageService.setItem('disease', response.data.user.disease);
        if (response.status === 200) {
            return {
            sucess:true,
            message: "Login successful"
            };
        }
    
    } catch (error) {
        return {
            sucess: false,
            message:error.message
        }
    }
}

export const getAllDiseaseNames = async () => {
    try{
        const response = await axios.get('http://18.217.109.182:1337/api/diagnosis/alldiseases');
        return response.data;
    
    } catch (error) {
        console.log(error);
        return [];
    }      
}



