import api from '../util/api'; 
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
     


export function encryptMessage(data)  {  
    console.log("data:", data);
    const byteData = forge.util.encodeUtf8(data); 
    const encryptedMessage = enclave_pub.encrypt(byteData);
    const base64EncryptedMessage = forge.util.encode64(encryptedMessage);
    console.log('encryptedMessage',base64EncryptedMessage);
    return base64EncryptedMessage;
}

export async function decryptMessage(data){
    const pub_key = forge.pki.publicKeyToPem(enclave_pub);

    const apiInstance = await api();
    const encryptedData = await apiInstance.getDataFromEnclave(data);
    console.log('encryptedData from enclave\n ', encryptedData);
    const decryptedDataBytes = private_key.decrypt(encryptedData);  
    const decryptedDataString = forge.util.decodeUtf8(decryptedDataBytes); // Convert bytes back to string

    console.log("plaintextData:\n", decryptedDataString);
    return decryptedDataString;

}

// // Decrypt the message using the private key
// const decryptedMessage = KJUR.asn1.CMS.decrypt(encryptedMessage, privateKey);
// console.log('Decrypted Message:', decryptedMessage);

