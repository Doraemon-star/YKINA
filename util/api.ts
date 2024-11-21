// util//api.ts
import axios from 'axios';
import { Diagnosis } from '@/constants/type';
import AsyncStorageService from '../util/storage'; 
import forge from 'node-forge';

const enclave_key = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA4Aouvv/p2ZUbBIOVGpC+AgE8fWuqd38+j75qwiy55IKdoUFzOcx1
CFS9MgLNnZAxGnXSQNf8jlUBPcn8XIJMs7Ax65dvGeccTZ7JS5wrz8gTdnChcnCr
Ki9Nwu/fVqwlzA0ghBeG/V+ZrL0jsHs2xKSnIozIMzxI6rjuBW06Elru/vT5WzAd
iR86BsQkLMk0oin+63OPRptV54H/qeaQQBjGZNg9gPsvHJaRKty6zkgDL25CRBJn
InIQPlEZgFzxKCibTRtEEqLYfzYWMbwty4soO25vlT1NX0Frx/HbQX/sRFTp8QYa
SAjpVumGkio1syudaPtR7nV+XRYIDFVu/QIDAQAB
-----END RSA PUBLIC KEY-----`;

const priv = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEArAm9ZFpXwW7cIyEL2mctaaZTKEmQvmNEyrtCDhBmCELA29PI
o7+y5babhDaxSpYqmdanOW7qnr0AibXvJ/SnrmaBCyb8WeerfoDwe7+qVoOtcgaf
p9HYKS9WWp2d+7qnvGIgVqdbXK7cFpaxpvXykRbjCiRzkaCt0q+Qh3vCnn6mgKRA
Oj7+4GHdUkMVDQ4kEcfl1UIAdK3CBZp7EUvm7+tAQU2pVjjoRmaUur0nxCkhN4Yr
ALU2W875+5FVpO+DB3QTE4GoIhV4GVUvr0bA38I8CzKrslJKSGNt2pcZcnL28+fj
GBZyPnqsK2HfV+XnIqrGRX4FdtdFqvR2/mnKJQIDAQABAoIBAEMQ7vSqpXBCc+37
6X+EXndDwEJB33vg/gXcV0VdTjFlOILZ/msbhbW4aMrzeUz+2m+rdvhUTYGBY67L
roZQgXfi/OZoldLElh3UTSuozdI5NgnwHBhTnWV8zzi3Hknue4pcZIfzaRHqFuF1
cJ8KXTwDhJHFIQqB7ZFnILw4WmfnitIoD/S8i3zTYLSRxTnCyKklCDGVuU9xeulS
Y6t3avLhb9xLUI7AeDskpT/rY7H4jYH7moBOq6/IwBO0jcSjQYHsqi1+2ghCAbYW
Ab5Usnrzyw8asGlr4Kp0LfS7Dn1zPYOwku3Zk0TjXlmaKYqAwspoF/PRUm6dBm4Y
Xxelv7cCgYEA3NEVe9yvP8wt98ttQ5wnvGB5oDyN2no85ve1AvATPAENXD7UUb04
MnK467KQz6lTeVlMUDZ2uyFhhdrRQ4a9HYb629Wiev0jK1UnJdPlVUrWjoqDNSA3
kakbIyYfKYV1NVsHreOMT/hRkCrnsG6RTmi4s+WoEk+XqcMmNYUFqVsCgYEAx3ME
XhTrnS1QiKzpfWBoIHXDmDEFXN8+Q+6nz2/VaKv6dKnRouNyf9UFtV8AYnO4jrJz
qoYYYoECmuV4Px3XRY+P58kFe65kgULRQjEg7rGpI4awo++VpIDfbUAW2YVGeQ6T
ozoyJ9xU0J7Zy03uCEYp8MmlVutu/nAAbMBFMn8CgYBHQvqp9HhiIGSdWXsznIt+
UawuuBwXa+eHql0yS4QJk1VadbRThLtEHJ3tAr2VJtIXkWf9YvZCQe2VIx7xqeQS
SWNf2rwK8PKOo3Z00MNsGTDQ44ageHs2eNqXJ1BbOASxaWU7CvpXPI4l9pK675PZ
OBaTiAQLlMAfOylzkDBZjQKBgC0r/JI+VLqtd67s0pkFy6+GXH1MpPVKznReSf1u
S7xALyJbD9K/hsAzA+73DERAB02yVwYJBt7Qb0GbtSc+X/IuOJ57ZdWEQtkPxAsk
y1ukOzWDnOAUNCUk1vWMbWBokfR6+68dUBy9ByyUvakRBlczZO5XDS5pdiMERORc
i4+LAoGANOWm6F1mNzVDktB+YAuXckXSqOzULGFUxW7Y/59KSJu5W9XcwjeZ8JzB
9fHeBxdGJWNfgc8/t2P3rjqO98SDBbr9h5PPtniGFrnQ8WkCtoq77+zJs987a/Bf
imlt/xdrrvWyC0sRqK/deLgBKQTQBvmtehYgdBs8R7KttvqCQl4=
-----END RSA PRIVATE KEY-----`;

const enclave_pub = forge.pki.publicKeyFromPem(enclave_key);
const private_key = forge.pki.privateKeyFromPem(priv);

const strapiLink = 'http://3.145.203.228:1337/api/';


export function encrypt_enclave(data)  {  
    let encryptedData: string;
    // Check if the input is an object, and if so, convert to a JSON string
    if (typeof data === 'object') {
        encryptedData = JSON.stringify(data); // Convert object to JSON string
    } else {
        encryptedData = data; // If it's already a string, use it as is
    }

    const encryptedMessage = enclave_pub.encrypt(encryptedData);
    //console.log("encryptedMessage",encryptedMessage);

    const base64EncryptedMessage = forge.util.encode64(encryptedMessage);
    //console.log("base64EncryptedMessage",base64EncryptedMessage);

    return base64EncryptedMessage;
}

export async function decryptMessage(data){
    const apiInstance = await api();
    const request_data = {encrypted_data:data}
    const encryptedData = await apiInstance.getDataFromEnclave(request_data);
    //console.log('encryptedData from enclave\n ', encryptedData);

    const dencryptedDecodeData = forge.util.decode64(encryptedData);
    const decryptedData= private_key.decrypt(dencryptedDecodeData);  
    const decryptedDataString = forge.util.decodeUtf8(decryptedData); // Convert bytes back to string
   //console.log("decryptedDataString",decryptedDataString);
    return decryptedDataString;
}

function signData(data) {
    const md = forge.md.sha256.create();
    md.update(data,'utf8');
    return forge.util.encode64(private_key.sign(md));   
}

export async function verifyData(originalData,requestdata) {
    //console.log("originalData",originalData);
    //console.log("requestdata",requestdata);

    const apiInstance = await api();  
    const signature_data = signData(originalData);
    const encrypted_request_data = encrypt_enclave(requestdata);
    const send_to_enclave = {signature:signature_data,original_data:originalData, request_data:encrypted_request_data}
    const response = await apiInstance.getDataFromEnclave(send_to_enclave);
    return (response == "Signature is valid!");
}

async function compare_data(data_1,data_2){
    const apiInstance = await api();
    const request_data = {compare:{data1:data_1, data2:data_2}};
    const response = await apiInstance.getDataFromEnclave(request_data);
    return (response == "Match");
}

const api = async () => {
    const authToken = await AsyncStorageService.getItem("jwtToken");
    //console.log('authToken', authToken);
    const userDocumentId = await AsyncStorageService.getItem("userDocumentId");
    //console.log('userDocumentId', userDocumentId);

    const register = async (username: string, kidName: string, diagnosisRecord: Diagnosis, email: string, password: string) => {       
        try {
            const diseaseName = encrypt_enclave(diagnosisRecord.diseaseName);
        
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
                    //console.log("userData",userData);
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
                    //await AsyncStorageService.setItem('diagnosisDocumentId', documentId);
                    await AsyncStorageService.setItem('userId', userData.id);
                    await AsyncStorageService.setItem('userDocumentId', userData.documentId);
                    //await AsyncStorageService.setItem('email', email);
                    await AsyncStorageService.setItem('kidName', kidName);
                    await AsyncStorageService.setItem('jwtToken', authToken);
                    await AsyncStorageService.setItem('currentStatus', '');

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
            //console.log(responseData);
            await AsyncStorageService.setItem('diseaseName', responseData.user.disease);
            await AsyncStorageService.setItem('userDocumentId', responseData.user.documentId);
            await AsyncStorageService.setItem('kidName', responseData.user.kidname);
            await AsyncStorageService.setItem('jwtToken', responseData.jwt);
            await AsyncStorageService.setItem('userId', responseData.user.id);
            await AsyncStorageService.setItem('currentStatus', responseData.user.currentStatus);
        
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

    const getInspiringSentences = async () => {
        try{
            const inspiringSentences = await axios.get(strapiLink + 'diagnosis/inspiringSentences');
            return inspiringSentences.data;
        
        } catch (error) {
            console.log(error);
            return [];
        }      
    }

    const getAllDiseases = async () => {
        try{
       
            const response = await axios.get(strapiLink + 'diagnosis/alldiseases');
            const diseases = response.data; 
            return diseases;
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

    const getDiseaseIntroduction = async (name) => {
        try{
            const response = await axios.post(strapiLink + 'diagnosis/introduction',
                {
                    diseaseName:name
                },
                {
                    headers:{
                        Authorization: 'Bearer ' + authToken
                    }
                }     
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }      
    }
    
    const updateCurrentStatus = async (userDocumentId: string, currentStatus: string) => {
        try {
            const response = await axios.put(strapiLink + 'users/'+ userDocumentId, 
                {currentStatus: currentStatus},
                {
                    headers:{
                        Authorization: 'Bearer ' + authToken
                    }
                }      
            ) ;
        
            await AsyncStorageService.setItem('currentStatus', currentStatus);  
            //console.log(response.data);
        
            return response.data; 
        } catch (error) {
            console.error("Failed to update current status:", error);
            return '';
        }
    };

    const newMedication = async (drugname,doseamount, doseunit, freq, timeperiod, startdate, enddate ) => {
        //console.log(drugname,doseamount, doseunit, freq, timeperiod, startdate, enddate);
        try {     
            const encryptedData = {
                drugname: encrypt_enclave(drugname),
                doseamount: doseamount,
                doseunit: doseunit,
                freq: freq,
                timeperiod: timeperiod,
                startdate: startdate,
                enddate: enddate,
                userdocumentId: userDocumentId
            };
            //console.log("encryptedData",encryptedData);
            const response = await axios.post(strapiLink + 'medication/create', 
                {data:encryptedData},           
                {headers:{
                    Authorization: 'Bearer ' + authToken
                }                 
            });
            const medication = response.data;
            return medication;
        }catch(error){
            console.error("Failed to careate new medication:", error);
        }
    };

    const updateMedication  = async (drugname,doseamount, doseunit, freq, timeperiod, startdate, enddate,medDocumentId ) => {
        try {  
            const encrypted_drugname = encrypt_enclave(drugname)
            const response = await axios.post(strapiLink + 'medication/update', {     
                    drugname:encrypted_drugname,
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
            const response = await axios.delete(strapiLink + 'medications/'+medDocumentId, {
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
            const response = await axios.get(strapiLink + 'medication/getAllDrugNames',{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const drugs = response.data;
            return drugs;
        }catch(error){
            console.error("Failed to get drugNames:", error);
            return [];
        }
    };

    const getAllDrugUnits = async() => {
        try {
            const response = await axios.get(strapiLink + 'medication/getAllUnits',{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const drugunits = response.data;  
            //console.log("drugunits",drugunits);
            return drugunits;
        }catch(error){
            console.error("Failed to get drugUnits:", error);
            return [];
        }
    };

    const getAllTimePeriods = async() => {       
        try {
            const response = await axios.get(strapiLink + 'medication/getAllTimePeriods',{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const timeperiods = response.data;  
            //console.log("timeperiods",timeperiods);
            return timeperiods;
        }catch(error){
            console.error("Failed to get timeperiods:", error);
            return [];
        }
    };

    const getAllMedications = async() => {
        try {
            const response = await axios.get(strapiLink + 'medication/getallmedication/' + userDocumentId,{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const medications = response.data; 
            //console.log("medications",medications);
            const formattedMedications = await Promise.all(medications.map(async (item) => ({
                drugname: await decryptMessage(item.drugName),  // Wait for decryption to complete
                doseamount: item.doseAmount,
                doseunit: item.doseUnit,
                freq: item.frequency,
                timeperiod: item.timePeriod,
                startdate: item.startDate,
                enddate: item.endDate,
                medDocumentId: item.documentId,
            })));
                   
            return formattedMedications;
        }catch(error){
            console.error("Failed to get all medications:", error);
            return [];
        }
    };

    const getDataFromEnclave = async(data) => {
        try {
            const response = await axios.post(strapiLink + 'enclave/send',             
            data,         
            {headers:{
                Authorization: 'Bearer ' + authToken
            }              
        });
            const enclaveData = response.data.enclave_data;
            return enclaveData;
        }catch(error){
            console.error("Failed to get enclave data:", error);
            return [];
        }
    };

    const getAllFighter = async() => {
        try {
            const response = await axios.get(strapiLink + 'users/allfighters',{
                headers:{
                    Authorization: 'Bearer ' + authToken
                }     
            });
            const users = response.data;  
            return users;
        }catch(error){
            console.error("Failed to get drugUnits:", error);
            return [];
        }
    };

    const getFellowFighters = async() => {
        try {
            const fighters = await getAllFighter();
            let fellowFighters = [];
            const diseasename = await AsyncStorageService.getItem('diseaseName');
            const userId = await AsyncStorageService.getItem('userId');
            
            for (const fighter of fighters) {
                if (fighter.id != userId) {
                    const fighter_diseasename = fighter.disease;
                    const response = await compare_data(diseasename,fighter_diseasename);
                    if (response){
                        fellowFighters.push(fighter);
                    }
                }                      
            }
            //console.log("fellowFighters",fellowFighters);
            return fellowFighters;
        }catch(error){
            console.error("Failed to get drugUnits:", error);
            return [];
        }
    }

    return { 
        register,
        signin,
        getInspiringSentences,
        getAllDiseases,
        updateDiagnosisUserTotal,
        updateCurrentStatus,
        getAllMedications,
        newMedication,
        updateMedication,
        deleteMedication,
        getAllDrugNames,
        getAllDrugUnits,
        getAllTimePeriods,
        getDataFromEnclave,
        getDiseaseIntroduction,
        getFellowFighters
    }
}

  
export default api;


