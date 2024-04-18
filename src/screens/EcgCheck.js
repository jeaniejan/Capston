
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EcgCheck = () => {
  const [isSleepTrackingActive, setIsSleepTrackingActive] = useState(false);
  const [isEcgActive, setIsEcgActive] = useState(false);
  const navigation = useNavigation();

  const navigateToRecording = () => {
    navigation.navigate('Recording');
  };

  const navigateToEcgCheck = () => {
    navigation.navigate('EcgCheck');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>측정하기</Text>
      
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToRecording}>
        <Text style={styles.buttonText}>수면호흡음 측정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToEcgCheck}>
        <Text style={styles.buttonText}>심전도 측정</Text>
      </TouchableOpacity>
      </View>
    
    

      <TouchableOpacity>
        <Image source={require("../../assets/smartwatch.png")}   style={{width:80, height:80 ,marginStart:160, marginTop:100, marginBottom:10 }}/>
      </TouchableOpacity>
      <View style={styles.container}>
      <Text style={styles.subtext}>Start</Text>
      <Text style={styles.subtext}>스마트워치를 착용해주세요</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#F1E7DF',
  },
  container2: {
    flex: 1,
    padding: 20,
  },
  
  subtext:{
    fontSize:15,
    textAlign: 'center',
    marginBottom:10,
    
  },
  
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:55,
    marginBottom: 50,
    marginStart:20,
    
  },
  headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 55,
      marginBottom: 50
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    
  },
  button: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
  },
  buttonText: {
      fontSize: 16,
      color: '#000',
  },
  startButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
  },
  buttonImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
  },
  instructionText: {
      position: 'absolute',
      bottom: 20,
      fontSize: 16,
  },
  
});

export default EcgCheck;





