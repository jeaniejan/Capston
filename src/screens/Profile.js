import React, { useState } from "react";
import styled from 'styled-components/native';
import { Text, Button, Image, StyleSheet, TouchableOpacity, TextInput, View, Modal, Alert } from 'react-native';
import { Picker } from "react-native-web";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

const Loginstyles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      marginBottom: 30,
      borderRadius: 20,
      borderColor: 'white',
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    },
    title: {
      fontSize: 20,
      marginBottom: 16,
      color: 'black',
    },
    input: {
      height: 50,
      width: '80%',
      borderColor: 'white',
      backgroundColor: 'white',
      marginBottom: 30,
      paddingLeft: 8,
      color: 'gray',
      borderRadius: 20,
    },
});

const styles = StyleSheet.create({
    mainText: {
        fontFamily: "Cochin",
        fontSize: 15,
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "flex-start"
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    dropdownLabel: {
        color: 'gray',
    },
    datePicker: {
        width: 200,
        marginBottom: 10,
    },
    datePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'flex-starts',
        padding: 16,
        marginBottom: 30,
        borderColor: 'white',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    selectText: {
        color: 'gray',
    }
});

const Container = styled.View`
    justify-content: center;
    alignItems: center;
    background-color: #F1E7DF;
    flex: 1;
`;

const ButtonContainer = styled.View`
    marginBottom: 130px;
    alignItems: flex-start;
`;

const Profile = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: '남자', value: '남자' },
      { label: '여자', value: '여자' }
    ]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleLogin = async () => {
        // Firebase 로그인 로직 예정
        console.log('프로필 수정 완료');
        setModalVisible(true); // 프로필 수정 완료 시 모달 표시
    };

    return (
        <Container>
            <ButtonContainer>
                <Text style={styles.titleText}>프로필 수정</Text>
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
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={styles.selectText}>{selectedDate ? selectedDate.toISOString().split('T')[0] : '생년월일'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <TextInput
                style={Loginstyles.input}
                value={id}
                onChangeText={setId}
                placeholder="몸무게(kg)"
                returnKeyType="next"
            />

            <TextInput
                style={Loginstyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="키(cm)"
                returnKeyType="next"
            />

            <TouchableOpacity
                style={{ 
                backgroundColor: '#D5B5A3',
                padding: 16,
                marginBottom: 10,
                borderRadius: 50,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={handleLogin}
            >
                <Text style={{ color: '#000000', fontSize: 15 }}>프로필 수정 완료</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Text style={{ marginBottom: 15, textAlign: "center" }}>프로필 수정이 완료되었습니다</Text>
                        <TouchableOpacity
                            style={{ backgroundColor: "#2196F3", padding: 10, elevation: 2, borderRadius: 10 }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ color: "white", textAlign: "center" }}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Container>
    );
};

export default Profile;
