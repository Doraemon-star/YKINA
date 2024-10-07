// util//api.ts
import axios from 'axios';
import { Diagnosis } from '@/constants/type';
import AsyncStorageService from '../util/storage'; 

const api = async () => {
    const authToken = await AsyncStorageService.getItem("jwtToken");
    const strapiLink = 'http://3.17.60.135:1337/api/';

    const register = async (username: string, kidName: string, diagnosisRecord: Diagnosis, email: string, password: string) => {       
        try {

            const diseaseName = diagnosisRecord.diseaseName;
        
            const signUp = await axios.post(strapiLink + 'auth/local/register', {
                username: username,
                kidname:kidName,
                disease: diseaseName,
                email: email,
                password: password
            });

        
            if (signUp.status === 200) {
                try {
                    const signUpData = signUp.data;
                    const authToken = signUpData.jwt;
                    const userData = signUpData.user;

                    const documentId = diagnosisRecord.documentId;
                    await axios.post(strapiLink + 'diagnosis/updateDiagnosisUserTotal', 
                        {documentId: documentId},
                        {
                            headers:{
                            Authorization: 'Bearer ' + authToken
                            }
                        }
                    );
                    await AsyncStorageService.setItem('diseaseName', diseaseName);
                    await AsyncStorageService.setItem('introduction', diagnosisRecord.introduction);
                    await AsyncStorageService.setItem('diagnosisDocumentId', documentId);
                    await AsyncStorageService.setItem('username', username);
                    await AsyncStorageService.setItem('userId', userData.id);
                    await AsyncStorageService.setItem('email', email);
                    await AsyncStorageService.setItem('kidName', kidName);
                    await AsyncStorageService.setItem('jwtToken', authToken);


                }catch(error){
                    console.log(error);
                }
            }    
                return {
                sucess:true,
                message: "Registration successful!"
                };
            
        } catch (error) {
            return {
                sucess: false,
                message:error.message
            }
        }      
    }

    const signin = async (email: string, password: string) => {
        try {
            const response = await axios.post(strapiLink + 'auth/local', {
                identifier: email,
                password: password
            });
            const responseData = response.data;
            await AsyncStorageService.setItem('jwtToken', responseData.jwt);
        
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

    const getAllDiseases = async () => {
        try{
            const disease = await axios.get(strapiLink + 'diagnosis/alldiseases');
            return disease.data;
        
        } catch (error) {
            console.log(error);
            return [];
        }      
    }

    const updateDiagnosisUserTotal = async () => {
        try{
            const diagnosis = await axios.post(strapiLink + 'diagnosis/updateDiagnosisUserTotal',{
                header:{
                    Authorization:authToken
                }
            });
            return diagnosis.data;
        
        } catch (error) {
            console.log(error);
            return [];
        }      
    }

    const updateCurrentStatus = async (userId: string, currentStatus: string) => {
        try {
            console.log(authToken);
            const response = await axios.put(strapiLink + 'users/'+ userId, 
                {currentStatus: currentStatus},
                {
                    headers:{
                        Authorization: 'Bearer ' + authToken
                    }
                }      
            ) ;
        
            await AsyncStorageService.setItem('currentStatus', currentStatus);  
            console.log(response.data);
        
            return response.data; 
        } catch (error) {
            console.error("Failed to update current status:", error);
            return '';
        }
    };

    const newMedication = async (doseamount, doseunit, freq, timeperiod, startdate, userdocumentId, drugname) => {
        try {       
            const response = await axios.post(strapiLink + 'medication/create', {
                data:{
                    doseamount:doseamount,
                    doseunit:doseunit,
                    freq: freq,
                    timeperiod:timeperiod,
                    startdate:startdate,
                    userdocumentId:userdocumentId
                },
                
                headers:{
                    Authorization: 'Bearer ' + authToken
                }                 
            });
            const medication = response.data;
            return medication;
        }catch(error){
            console.error("Failed to careate new medication:", error);
        }
    };

    const updateMedication  = async (doseamount, doseunit, freq, timeperiod, startdate, enddate,medDocumentId ) => {
        try {       
            const response = await axios.post(strapiLink + 'medication/update', {              
                    doseamount:doseamount,
                    doseunit:doseunit,
                    freq: freq,
                    timeperiod:timeperiod,
                    startdate:startdate,
                    enddate: enddate,
                    medDocumentId:medDocumentId
                },
                {headers:{
                    Authorization: 'Bearer ' + authToken
                }    
                
            });
            const updateMedication = response.data;
            return updateMedication;
        }catch(error){
            console.error("Failed to update new medication:", error);
        }
    };

    const deleteMedication = async(medDocumentId) => {
        try {
            const response = await axios.delete(strapiLink + 'medication/'+medDocumentId, {
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            })
            return response.data;
        }catch(error){
            console.error("Failed to delete medication:", error);
        }
    };

    const getAllDrugNames = async() => {
        try {
            const response = await axios.get(strapiLink + 'drug/all',{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const drugs = response.data;
    
            const drugNames = drugs.map(drug => drug.drugName);
            return drugNames;
        }catch(error){
            console.error("Failed to delete medication:", error);
            return [];
        }
    }

         

    return { 
        register,
        signin,
        getAllDiseases,
        updateDiagnosisUserTotal,
        updateCurrentStatus,
        newMedication,
        updateMedication,
        deleteMedication,
        getAllDrugNames

    }
}

  
export default api;

