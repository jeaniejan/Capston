import React,{useState} from "react";
import styled from 'styled-components/native';
import {Text,Button,Image,StyleSheet,TouchableOpacity,TextInput,View} from 'react-native';
import { Picker } from "react-native-web";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

//import auth from '@react-native-firebase/auth';

const Loginstyles = StyleSheet.create({ //입력창 스타일
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      marginBottom: 30,
      borderRadius:20,
      borderColor: 'white',
      width: '80%', // 전체 너비의 80%로 설정
      marginLeft: '10%', // 나머지 10%를 왼쪽으로 마진
      marginRight: '10%',// 나머지 10%를 오른쪽으로 마진

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
      marginBottom: 30,
      paddingLeft: 8,
      fontColor:'gray',
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
    dropdownLabel: {
        color: 'gray', // 폰트 색상을 회색으로 변경
      },

    datePicker: {
        width: 200,
        marginBottom: 10,
      },
      datePickerContainer: {
        backgroundColor: 'white', // 흰색 배경 추가
        borderRadius: 5, // 원하는 값으로 조절
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginBottom: 30,
        borderRadius:20,
        borderColor: 'white',
        width: '80%', // 전체 너비의 80%로 설정
        marginLeft: '10%', // 나머지 10%를 왼쪽으로 마진
        marginRight: '10%',// 나머지 10%를 오른쪽으로 마진
      },
      selectText: {
        color: 'gray', 
      }

})

const Container=styled.View`
    justify-content:center;
    alignItems:center; 
    background-color:#F1E7DF;
    flex:1;

`;

  
const ButtonContainer=styled.View`   
    marginBottom:130;
    alignItems:flex-start; 

`;




const LoginButton = () => {   //회원가입 완료 버튼

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
            <Text style={{color:'#000000',fontSize: 15} }>회원가입 완료</Text>
        </TouchableOpacity>
    );
};




const Signup2=()=>{
    const [id,setId] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState("false");
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: '남자', value: '남자'},
      {label: '여자', value: '여자'}
    ]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };


  const [selectedWeight, setSelectedWeight] = useState(null);

  const weightOptions = [];
  for (let i = 30; i <= 200; i++) {
    weightOptions.push({ label: `${i} kg`, value: i });
  }

  

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
                <Text style={styles.titleText}>회원가입(2/2)</Text>
            </ButtonContainer>

            <Text style={styles.mainText}>수면질 측정에 필요한 정보를 입력해주세요</Text>

            <DropDownPicker
        
                style={Loginstyles.container} 
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="성별"
                labelStyle={styles.selectText}
            />
 


            <View style={styles.datePickerContainer}>
                <TouchableOpacity style={{alignSelf:'flex-start' }} onPress={showDatePicker}>
                <Text style={styles.selectText}>{selectedDate ? selectedDate.toISOString().split('T')[0] : '생년월일'}</Text>
                </TouchableOpacity>
      
                <DateTimePickerModal
                style={styles.datePicker}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                labelStyle={styles.dropdownLabel} 
                />
            </View >


            <TextInput
                style={Loginstyles.input}
                value={id}
                onChangeText={text=>setId(text)}
                onSubmitEditing={()=>{}}
                placeholder="몸무게(kg)"
                returnKeyType="next"
            />  




 
            <TextInput
                style={Loginstyles.input}
                value={password}
                onChangeText={text=>setPassword(text)}
                onSubmitEditing={()=>{}}
                placeholder="키(cm)"
                returnKeyType="next"
            />  

            <LoginButton style={styles.button} onPress={handleLogin}/>




        </Container> 





    )
}

export default Signup2;
