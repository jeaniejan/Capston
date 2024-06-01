import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

const Tracking = () => {
  return (
      <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.title}>수면 트래킹</Text>
              <Text style={styles.subtitle}>주간 수면 시간</Text>

              <View>
                  <Image
                      style={styles.chartImage}
                      source={require("../../assets/Sleepgraph.png")} 
                  />
              </View>
              <Text style={styles.subtitle}>최근 30일 그래프</Text>
              <View style={[styles.centeredImageContainer, { marginLeft: 90 }]}>
                  <Image
                      style={styles.chartImage}
                      source={require("../../assets/Chart.png")} // Replace with your recent 30 days chart image path
                  />
              </View>
              <TouchableOpacity style={styles.averageSleepContainer}>
                  <Text style={styles.averageSleepText}>이번주 평균 수면시간</Text>
                  <Text style={styles.averageSleepValue}>7시간 11분</Text>
              </TouchableOpacity>

              {/* Additional content below */}
              <View style={styles.additionalContent}>
                  <Text style={styles.additionalText}>김이화 님은</Text>
                  <Text style={styles.additionalText}>
                      이번 주 20대 여성 권장 수면시간에
                  </Text>
                  <Text style={styles.additionalText}>
                      <Text style={styles.highlightBlue}>알맞게</Text> 자고 있어요.
                  </Text>
                  <Text style={styles.additionalText}>한국인 20대 여성 평균 수면시간보다</Text>
                  <Text style={styles.additionalText}>
                      <Text style={styles.highlightOrange}>24분 적게</Text> 자고 있어요.
                  </Text>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b1464',
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 40, 
        marginTop: 40,
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 40, 
        marginTop: 40,
    },
    card: {
        backgroundColor: '#50278f',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    cardValue: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
    },
    chartImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    centeredImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    averageSleepContainer: {
        backgroundColor: '#D2D6FF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        width: '70%',
        height: 100,
        marginLeft: 80,
    },
    averageSleepText: {
        color: 'black',
        fontSize: 16,
    },
    averageSleepValue: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#50278f',
        paddingVertical: 10,
    },
    navText: {
        color: 'white',
        fontSize: 14,
    },
    additionalContent: {
        marginTop: 20,
        paddingHorizontal: 40,
    },
    additionalText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    highlightBlue: {
        color: '#9DCEFF',
    },
    highlightOrange: {
        color: '#EFA482',
    },
});

export default Tracking;



