import React, { useState } from "react";
import styled from 'styled-components/native';
import { Text, Button, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 사용을 위해 import

const Loginstyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontColor: 'black',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#F7F8F8',
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 8,
    fontColor: 'black',
    borderRadius: 20,
    backgroundColor: '#F7F8F8'
  },
});

const styles = StyleSheet.create({
  mainText: {
    fontSize: 15,
    marginBottom: 80,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
})

const Container = styled.View`
  justify-content:center;
  alignItems:center; 
  background-color:white;
  flex:1;
`;

const LoginButton = ({ onPress }) => { // 로그인 버튼
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#D5B5A3',
        padding: 16,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#000000', fontSize: 15 }}>로그인</Text>
    </TouchableOpacity>
  );
};

const Login = () => {
  const navigation = useNavigation(); // 네비게이션 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // 여기에 로그인 로직을 구현
      // ex)  await auth().signInWithEmailAndPassword(email, password);
      console.log('로그인 성공');
      navigation.navigate('Tracking'); // 로그인 성공 시 Tracking 화면으로 이동
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  return (
    <Container>
      <Text style={styles.mainText}>이미 계정이 있으신가요?</Text>
      <TextInput
        style={Loginstyles.input}
        onChangeText={setEmail}
        placeholder="아이디를 입력하세요"
        returnKeyType="next"
      />
      <TextInput
        style={Loginstyles.input}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        returnKeyType="done"
        secureTextEntry // 비밀번호 숨김 처리
      />
      <LoginButton onPress={handleLogin} />
    </Container>
  );
}

export default Login;






















/*
import React,{useState} from "react";
import styled from 'styled-components/native';
import {Text,Button,Image,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { View } from "react-native-web";
//import auth from '@react-native-firebase/auth';

const Loginstyles = StyleSheet.create({ //입력창 스타일
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,

        
    },
    title: {
      fontSize: 20,
      marginBottom: 16,
      fontColor:'black',
      
    },
    input: {
      height: 50,
      width: '80%',
      borderColor: '#F7F8F8',
      borderWidth: 1,
      marginBottom: 30,
      paddingLeft: 8,
      fontColor:'black',
      borderRadius:20,
      backgroundColor:'#F7F8F8'
    },
  });


const styles=StyleSheet.create({
    mainText:{
        fontSize:15,
        marginBottom:80,
        //justifyContent:"flex-start",
    },
    titleText:{
        fontSize:20,
        fontWeight:"bold"
    },
 
})

const Container=styled.View`
    justify-content:center;
    alignItems:center; 
    background-color:white;
    flex:1;

`;

//앱로그인 버튼     
const ButtonContainer=styled.View`   

    flex-direction:row;
    justify-content:space-between;
    alignItems:center; 

`;



const LoginButton = () => {   //로그인 버튼

    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#D5B5A3',
            padding: 16,
            marginTop:30,
            marginBottom: 50,
            borderRadius: 50,
            width:200,
            alignItems: 'center',
            justifyContent: 'center',
            }}
          
        >
            <Text style={{color:'#000000',fontSize: 15} }>로그인</Text>
        </TouchableOpacity>
    );
};




const Login=()=>{
    const [id,setId] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        // Firebase에 이메일과 비밀번호로 로그인 요청을 보냄
        await auth().signInWithEmailAndPassword(email, password);
  
        // 로그인 성공시, 원하는 동작 수행
        console.log('로그인 성공');
      } catch (error) {
        console.error('로그인 실패:', error.message);
      }

    };
  


    return(
        <Container>
            <Text style={styles.mainText}>이미 계정이 있으신가요?</Text>
            <TextInput
                style={Loginstyles.input}
                //value={id}
                onChangeText={text=>setId(text)}
                onSubmitEditing={()=>{}}
                placeholder="아이디를 입력하세요"
                returnKeyType="next"
            />

            <TextInput
                style={Loginstyles.input}
                label="Password"
                //value={password}
                onChangeText={text=>setPassword(text)}
                onSubmitEditing={()=>{}}
                placeholder="비밀번호를 입력하세요"
                returnKeyType="done"
                isPassword
            />
            <LoginButton style={styles.button} onPress={handleLogin}/>


            


        </Container> 





    )
}

export default Login;
*/