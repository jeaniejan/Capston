import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const EcgCheck = () => {
  const [checkboxOneChecked, setCheckboxOneChecked] = useState(false);
  const [checkboxTwoChecked, setCheckboxTwoChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>측정하기</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setCheckboxOneChecked(!checkboxOneChecked)}>
          {checkboxOneChecked && <Text>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>수면측정중</Text>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setCheckboxTwoChecked(!checkboxTwoChecked)}>
          {checkboxTwoChecked && <Text>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>심전도</Text>
      </View>
      <TouchableOpacity style={styles.startButton}>
        <Image
          source={require('../../assets/smartwatch.png')} // 버튼 이미지를 프로젝트에 맞게 경로 설정하세요.
          style={styles.buttonImage}
        />
       
        <Text style={styles.buttonText}>start</Text>
      </TouchableOpacity>
      <Text style={styles.instructionText}>스마트워치를 착용하세요</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F1E7DF',
        alignItems:'center',
        justifyContent:'center',
    },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#F1E7DF', // 헤더 배경색
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:55,
    marginBottom: 50
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    margin: 10,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // 버튼 스타일 설정
  },
  buttonImage: {
    width: 100, // 이미지 크기 조절
    height: 100, // 이미지 크기 조절
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
  instructionText: {
    position: 'absolute',
    bottom: 200,
    fontSize: 16,
  },
});

export default EcgCheck;
