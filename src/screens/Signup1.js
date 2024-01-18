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
      borderColor: 'white',
      backgroundColor:'white',
      borderWidth: 1,
      marginBottom: 30,
      paddingLeft: 8,
      fontColor:'black',
      borderRadius:20,
    },
  });


const styles=StyleSheet.create({
    mainText:{
        fontFamily:"Cochin",
        fontSize:15,
        marginTop:0,
        marginBottom:50,
        justifyContent:"flex-start"
    },

    //회원가입(1/2) 텍스트 
    titleText:{
        fontSize:18,
        fontWeight:"bold",
        //marginBottom:100,
        justifyContent:"flex-start",
        alignItems:"center"
    },
 
})

const Container=styled.View`
    justify-content:center;
    alignItems:center; 
    background-color:#F1E7DF;
    flex:1;

`;

//앱로그인 버튼     
const ButtonContainer=styled.View`   
    marginBottom:130;
    alignItems:flex-start; 

`;



const LoginButton = () => {   //로그인 버튼

    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#D5B5A3',
            padding: 16,
            marginBottom: 50,
            borderRadius: 50,
            width:200,
            alignItems: 'center',
            justifyContent: 'center',
            }}
          
        >
            <Text style={{color:'#000000',fontSize: 15} }>다음 장 넘어가기</Text>
        </TouchableOpacity>
    );
};




const Signup1=()=>{
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
            <ButtonContainer>
                <Text style={styles.titleText}>회원가입(1/2)</Text>
            </ButtonContainer>

            <Text style={styles.mainText}>사용하실 아이디와 비밀번호를 입력해주세요</Text>
            <TextInput
                style={Loginstyles.input}
                value={id}
                onChangeText={text=>setId(text)}
                onSubmitEditing={()=>{}}
                placeholder="아이디"
                returnKeyType="next"
            />

            <TextInput
                style={Loginstyles.input}
                label="Password"
                //value={password}
                onChangeText={text=>setPassword(text)}
                onSubmitEditing={()=>{}}
                placeholder="비밀번호"
                returnKeyType="done"
                isPassword
            />
            <TextInput
                style={Loginstyles.input}
                label="Password"
                //value={password}
                onChangeText={text=>setPassword(text)}
                onSubmitEditing={()=>{}}
                placeholder="비밀번호 확인"
                returnKeyType="done"
                isPassword
            />
            <LoginButton style={styles.button} onPress={handleLogin}/>




        </Container> 





    )
}

export default Signup1;