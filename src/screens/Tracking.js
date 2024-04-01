import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button,StyleSheet ,Image} from 'react-native';
import { Card } from 'react-native-paper'; // UI 요소를 위한 라이브러리

const Tracking = () => {
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  const toggleBedtimeSwitch = () => setIsBedtimeEnabled(previousState => !previousState);
  const toggleAlarmSwitch = () => setIsAlarmEnabled(previousState => !previousState);

  // 여기에 실제 알람 설정을 위한 함수 호출(일단 ui만 구현함)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>수면 트래킹</Text>



  <Card style={styles.card}>
    {/* 이미지 삽입 */}
    <Card.Cover  source={require("../../assets/Sleepgraph.png")}/>
    <Card.Title title="주간 수면시간" subtitle="평균 수면시간: 7h 10m" />
  </Card>


      <Card style={styles.card}>
        <Card.Title title="Last Night Sleep" subtitle="8h 20m" />
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Today's Schedule" />
        <Card.Content>
          <View style={styles.scheduleRow}>
            <Text style={styles.mainText}>Bedtime</Text>
            <Text style={styles.smallText}>in 6 hours 22 minutes</Text>

            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isBedtimeEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleBedtimeSwitch}
              value={isBedtimeEnabled}
            />
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.mainText}>Alarm</Text>
            <Text style={styles.smallText}>in 14 hours 30 minutes</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAlarmEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAlarmSwitch}
              value={isAlarmEnabled}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

// 스타일링 부분
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:55,
    marginBottom: 50
    
  },
  card: {
    marginBottom: 20,
  },

  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },

  mainText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  smallText: {
    fontSize: 14, // 작은 글씨를 위해 폰트 사이즈 감소
    fontWeight: 'normal', // 필요에 따라 가중치 조정
  },

});

export default Tracking;
