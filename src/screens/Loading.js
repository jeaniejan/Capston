import React from "react";
import styled from 'styled-components/native';
import {Text,Button,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { View } from "react-native-web";

const styles=StyleSheet.create({
    mainText:{
        fontFamily:"Cochin",
        fontSize:50,
        marginTop:30,
        marginBottom:30,
    },
    titleText:{
        fontSize:20,
        fontWeight:"bold"
    },
 
})

const Container=styled.View`
    margin-top:179;
    justify-content:center;
    alignItems:center; 
    background-color:('#B39179',0.18);

`;


const LoginButton = () => {   //로그인 버튼
    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#D5B5A3',
            padding: 16,
            margin: 10,
            borderRadius: 50,
            width:290,
            alignItems: 'center',
            justifyContent: 'center',
            }}
          
        >
            <Text style={{color:'#000000',fontSize: 15} }>로그인</Text>
        </TouchableOpacity>
    );
};

const SignUpButton = () => {   //회원가입 버튼
    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#D5B5A3',
            padding: 16,
            margin: 25,
            borderRadius: 50,
            width:290,
            alignItems: 'center',
            justifyContent: 'center',

        
            }}
          
        >
            <Text style={{ color: 'black', fontSize: 15}}>회원가입</Text>
        </TouchableOpacity>
    );
};

const Loading=()=>{
    return(
        <Container>
            <Image source={require("../../assets/medcolearn.png")}   style={{width:220, height:220 }}/>
            <Text style={styles.mainText}>MedCoLearn</Text>
            <LoginButton style={styles.button}/>

            <SignUpButton style={styles.button} />





        </Container> 



    )
}

export default Loading;