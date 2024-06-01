import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';

const Result = () => {
  const [sleepScore, setSleepScore] = useState(75);
  const rotateAnimation = useRef(new Animated.Value(0)).current;  // Initial value for rotation

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    rotateAnimation.setValue(0);
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        isInteraction: false,
      })
    ).start();
  };

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>수면장애 위험도</Text>
      <Text style={styles.percentageText}>수면 무호흡증 위험도 상위 18%</Text>

      <View style={styles.circleContainer}>
        <Animated.View style={[styles.outerCircle, { transform: [{ rotate: rotation }] }]}>
          <View style={styles.innerCircle}>
            <Text style={styles.scoreText}>{sleepScore}</Text>
          </View>
        </Animated.View>
      </View>
      
      <Text style={styles.infoText}>김이화 님의 수면장애 위험도는 75점입니다</Text>

      <View style={styles.detailBox}>
        <Text style={styles.dateText}>측정일자: 2024.05.07</Text>
        <Text style={styles.infoSubText}>연계병원: 이대목동병원</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b1464',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#312783',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#5e4ae3',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#5e4ae3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  detailBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 40,
    marginTop:40,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  infoSubText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Result;



/*
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Result = () => {
  const [sleepScore, setSleepScore] = useState(75);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>수면장애 위험도</Text>
      <Text style={styles.percentageText}>수면 무호흡증 위험도 상위 18%</Text>

      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={[styles.innerCircle, {transform: [{rotate: `${(sleepScore / 100) * 360 - 90}deg`}] }]}>
            <Text style={styles.scoreText}>{sleepScore}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.infoText}>김이화 님의 수면장애 위험도 75점입니다</Text>
      <Text style={styles.dateText}>측정일자: 2024.05.07</Text>
      <Text style={styles.infoSubText}>연계병원: 이대목동병원</Text>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b1464',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#312783',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#5e4ae3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  infoSubText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Result;
*/