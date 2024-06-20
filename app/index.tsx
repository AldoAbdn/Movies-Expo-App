import { TextInput, Text, View, Button } from "react-native";
import { router } from 'expo-router';
import { useState } from "react";
import { CognitoUser, CognitoUserPool, AuthenticationDetails, } from "amazon-cognito-identity-js"; 
import {COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID} from 'react-native-dotenv';

export default function Index() {
  const [message, setMessage] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleAuthentication = async () => { 
    try { 
        const poolData = { 
            UserPoolId: COGNITO_USER_POOL_ID, 
            ClientId: COGNITO_CLIENT_ID
        }; 
        const UserPool = new CognitoUserPool(poolData); 
        const user = new CognitoUser({ Username: username, Pool: UserPool, }); 
        const authDetails = new AuthenticationDetails({ Username: username, Password: password, }); 
        try { 
            await new Promise((resolve, reject) => { user.authenticateUser(authDetails, { 
                onSuccess: (session) => { 
                    console.log("Authentication successful", session); 
                    resolve(0); 
                }, 
                onFailure: (err) => { 
                    console.error("Authentication failed", err); 
                    reject(err); 
                },}); 
            }); 
            setMessage("Authentication successful"); 
            router.replace("/movies")
        } catch (error) { 
            setMessage("Authentication failed"); 
        } 
    } catch (error) { 
        console.error("App failed", error); 
    }   
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15
      }}
    >
      <TextInput style={textInputStyle} placeholder="Username" value={username} onChangeText={(text) => setUsername(text)}/>
      <TextInput style={textInputStyle} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}/>
      <Button  title="Login" onPress={handleAuthentication}/>
      <Text style={{color:"red"}}>{message}</Text>
    </View>
  );
}

const textInputStyle = {
  borderWidth:1,
  borderColor:"black",
  borderRadius:5,
  height:30
}
