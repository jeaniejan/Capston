
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Animated } from 'react-native';

const EcgCheck = () => {
  const [measuring, setMeasuring] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (measuring) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animation.stopAnimation();
      animation.setValue(0);
    }
  }, [measuring, animation]);

  const startMeasurement = () => {
    setMeasuring(true);
  };

  const stopMeasurement = () => {
    setMeasuring(false);
  };

  const uploadFile = () => {
    // Add functionality to upload file
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>측정하기</Text>
        <TouchableOpacity style={styles.smallButton} onPress={() => {}}>
          <Text style={styles.smallButtonText}>심전도</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.screen}>
        {!measuring ? (
          <>
            <Text style={styles.subtitle}>스마트 워치를 착용해주세요</Text>
            <Image
              style={styles.icon}
              source={require("../../assets/smartwatch.png")}
            />
            <Text style={styles.subtitle2}>자는 동안 당신의 심전도를 측정하여,</Text>
            <Text style={styles.subtitle2}>수면 무호흡증 위험도를 알 수 있어요</Text>
            <TouchableOpacity style={styles.button} onPress={startMeasurement}>
              <Text style={styles.buttonText}>워치로 심전도 측정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadFile}>
              <Text style={styles.buttonText}>파일 업로드</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.measurementContainer}>
              <Animated.View style={[styles.pulse, { transform: [{ scale }], opacity }]} />
              <Image
                style={styles.icon}
                source={require("../../assets/smartwatch.png")}
              />
              <View style={styles.spacing} /> 
            </View>
            <TouchableOpacity style={styles.stopButton} onPress={stopMeasurement}>
              <Text style={styles.buttonText}>심전도 측정 중...</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 40, 
    marginTop: 40, 
  },
  title: {
    color: '#fff',
    fontSize: 25,
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    width: 120,
    height: 160,
    borderRadius: 10,
    margin: 10,
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
  measurementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  spacing: {
    height: 40, // Adjust the height value to increase or decrease spacing
  },
  waveform: {
    width: '90%',
    height: 200,
    marginBottom: 40,
  },
});

export default EcgCheck;



