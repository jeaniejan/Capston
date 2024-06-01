import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Animated, Platform, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker from Expo

const Recording = () => {
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

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (result.type === 'success') {
        console.log('Selected file:', result);
      } else {
        console.log('Canceled or failed to select file.');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
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
          <Text style={styles.smallButtonText}>수면호흡음</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.screen}>
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
            <TouchableOpacity style={styles.button} onPress={selectFile}>
              <Text style={styles.buttonText}>파일 업로드</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.measurementContainer}>
              <Animated.View style={[styles.pulse, { transform: [{ scale }], opacity }]} />
              <Image
                style={styles.icon}
                source={require("../../assets/mic.png")}
              />
              <View style={styles.spacing} />
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 40, // Aligns to the left
    marginTop: 40, // Aligns to the top
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
});

export default Recording;

/*
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Animated } from 'react-native';

const Recording = () => {
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
          <Text style={styles.smallButtonText}>수면호흡음</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.screen}>
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
            <View style={styles.measurementContainer}>
              <Animated.View style={[styles.pulse, { transform: [{ scale }], opacity }]} />
              <Image
                style={styles.icon}
                source={require("../../assets/mic.png")}
              />
              <View style={styles.spacing} />
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 40, // Aligns to the left
    marginTop: 40, // Aligns to the top
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
});

export default Recording;
*/