import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 여기서는 실제로 파일을 불러오는 대신 가상의 데이터를 사용합니다.
    // 실제 앱에서는 서버에서 데이터를 불러오거나, 앱에 포함된 데이터 파일에서 읽어옵니다.
    const fetchData = async () => {
      const rawData = 'timestamp,value\n2023-01-01,100\n2023-01-02,150'; // 예시 CSV 문자열
      const parsedData = rawData.split('\n').slice(1).map(row => {
        const [timestamp, value] = row.split(',');
        return { timestamp, value };
      });
      setData(parsedData);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.text}>{item.timestamp}: {item.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default App;
