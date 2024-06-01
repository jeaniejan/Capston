import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const ECG = () => {
  const [measuring, setMeasuring] = useState(false);

  const startMeasurement = () => {
    setMeasuring(true);
    // Add functionality to start measurement
  };

  const stopMeasurement = () => {
    setMeasuring(false);
    // Add functionality to stop measurement
  };

  const uploadFile = () => {
    // Add functionality to upload file
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>측정하기</Text>
          <TouchableOpacity style={styles.smallButton} onPress={() => {}}>
            <Text style={styles.smallButtonText}>수면호흡음</Text>
          </TouchableOpacity>
        </View>
        {!measuring ? (
          <>
            <Text style={styles.subtitle}>스마트폰 녹음기를 사용합니다</Text>
            <Image
              style={styles.icon}
              source={require("../../assets/mic.png")}
            />
            <Text style={styles.subtitle2}>자는 동안 당신의 수면호흡음을 측정하여,</Text>
            <Text style={styles.subtitle2}>수면 무호흡증 위험도를 알 수 있어요</Text>
            <TouchableOpacity style={styles.button} onPress={startMeasurement}>
              <Text style={styles.buttonText}>수면호흡음 측정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadFile}>
              <Text style={styles.buttonText}>파일 업로드</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image
              style={styles.icon}
              source={require("../../assets/mic.png")}
            />
            <TouchableOpacity style={styles.stopButton} onPress={stopMeasurement}>
              <Text style={styles.buttonText}>수면 호흡음 측정 중...</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b1464',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
   // marginBottom: 20,
    marginLeft: 20, // Aligns to the left
    marginTop: 20, // 
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 10,
  },
  smallButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  subtitle2: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 15,
  },
  icon: {
    width: 95,
    height: 95,
    borderRadius: 100,
    margin: 20,
  },
  button: {
    backgroundColor: '#D2D6FF',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#bb86fc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: "bold",
  },
  waveform: {
    width: '90%',
    height: 200,
    marginBottom: 40,
  },
});

export default ECG;
