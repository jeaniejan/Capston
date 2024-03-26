import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { HeartRateSensor } from 'expo-sensors'; // Expo Sensors에서 HeartRateSensor 가져오기
import * as FileSystem from 'expo-file-system'; // 파일 시스템에 접근하기 위한 Expo API

const ECG = () => {
  const [heartRate, setHeartRate] = useState(null); // 심전도 측정 결과 상태

  useEffect(() => {
    // 컴포넌트 마운트 시, 심전도 측정 시작
    startHeartRateMeasurement();

    // 컴포넌트 언마운트 시, 심전도 측정 중지
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const startHeartRateMeasurement = async () => {
    try {
      const sensor = new HeartRateSensor(); // HeartRateSensor 인스턴스 생성

      // 심전도 측정 시작
      await sensor.start();

      // 측정 결과를 업데이트하는 이벤트 리스너 등록
      const sub = sensor.addListener(({ heartRate }) => {
        setHeartRate(heartRate);
      });
    } catch (error) {
      Alert.alert('Error', error.message); // 에러 발생 시 경고창 표시
    }
  };

  const generatePDF = async () => {
    try {
      // HTML 컨텐츠 생성
      const htmlContent = `<html><body><h1>Heart Rate Report</h1><p>Heart Rate: ${heartRate}</p></body></html>`;
      const pdfUri = FileSystem.cacheDirectory + 'heartRateReport.pdf';

      // HTML을 PDF로 변환하여 파일로 저장
      await FileSystem.writeAsStringAsync(pdfUri, htmlContent, { encoding: FileSystem.EncodingType.UTF8 });

      return pdfUri;
    } catch (error) {
      Alert.alert('Error', error.message); // 에러 발생 시 경고창 표시
    }
  };

  const sharePDF = async () => {
    try {
      // PDF 생성
      const pdfUri = await generatePDF();

      // PDF 공유
      await FileSystem.shareAsync(pdfUri);
    } catch (error) {
      Alert.alert('Error', error.message); // 에러 발생 시 경고창 표시
    }
  };

  return (
    <View style={styles.container}>
      {/* 심전도 측정 결과 표시 */}
      {heartRate ? (
        <Text style={styles.text}>Heart Rate: {heartRate}</Text>
      ) : (
        <Text style={styles.text}>심전도 측정</Text>
      )}
      {/* PDF 공유 버튼 */}
      <Button title="Share PDF" onPress={sharePDF} disabled={!heartRate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ECG;
