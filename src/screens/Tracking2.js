import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Linking } from 'react-native';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ScheduleItem = ({ day, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(day)} style={styles.dayCard}>
      <Text style={styles.dayText}>{day}</Text>
    </TouchableOpacity>
  );
};

const Tracking2 = () => {
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleBedtimeSwitch = () => setIsBedtimeEnabled(previousState => !previousState);
  const toggleAlarmSwitch = () => setIsAlarmEnabled(previousState => !previousState);

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  // 여기에 실제 알람 설정을 위한 함수 호출(일단 ui만 구현함)
  const handleLearnMorePress = async () => {
    const url = 'https://www.cdc.gov/sleep/about_sleep/how_much_sleep.html';
  
    // URL을 지원하는 앱이 있는지 확인하고, 지원하는 앱이 있으면 열기
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>수면 스케쥴</Text>

      <Card style={styles.card}>
  <Card.Content style={styles.cardContent}>

    <View style={styles.leftContent}>
      <Text style={styles.title}>Ideal Hours for Sleep</Text>
      <Text style={styles.subtitle}>7hours or more</Text>
      <TouchableOpacity onPress={handleLearnMorePress} style={styles.learnMoreButton}>
  <Text style={styles.learnMoreButtonText}>Learn More</Text>
</TouchableOpacity>

    </View>

    <TouchableOpacity onPress={handleLearnMorePress} style={styles.rightContent}>
      <Image
        style={styles.icon}
        source={require("../../assets/sleep.png")}
      />
    </TouchableOpacity>

  </Card.Content>
</Card>


  
      {/* 요일별 스케쥴 뷰 */}
      <Text style={styles.scheduleHeader}>Your Schedule</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day) => (
          <ScheduleItem key={day} day={day} onPress={handleDayPress} />
        ))}
      </ScrollView>


<Card style={styles.detailsCard}>
<Card.Title title={`Schedule for ${selectedDay}`} />
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


      <Card style={styles.blueCard}>
        <Card.Content>
          <View style={styles.scheduleRow}>
            <Text style={styles.smallText}>You will get 8 hours 10 minutes for tonight</Text>

          </View>

        </Card.Content>
      </Card>


    </ScrollView>
  );
};

// 스타일링 부분에 추가
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
  daysOfWeekContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  dayCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 4,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  dayText: {
    fontSize: 16,
    color: 'black',
  },
  detailsCard: {
    marginVertical: 8,


  },
  blueCard: {
    marginVertical: 8,
    backgroundColor:'skyblue'

  },
  scheduleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },


  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContent: {
    // 이미지를 담고 있는 TouchableOpacity를 오른쪽으로 정렬합니다.
    alignItems: 'flex-end',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 20,
  },
  title: {
    marginBottom:10,

  },
  subtitle:{
    color:'skyblue'
  },
 
    learnMoreButton: {
      backgroundColor: 'skyblue', // 버튼의 배경색 설정
      paddingHorizontal: 20, // 좌우 패딩으로 타원형 모양 생성
      paddingVertical: 10, // 상하 패딩
      borderRadius: 20, // 둥근 모서리 효과
      alignSelf: 'flex-start', // 버튼을 컨테이너의 시작점으로 정렬
      marginTop: 10, // 버튼 위에 마진 추가
    },
    learnMoreButtonText: {
      color: 'white', // 텍스트 색상은 하얀색으로
      fontWeight: 'bold', // 글씨 굵기
      textAlign: 'center', // 텍스트를 가운데 정렬
    },


});


export default Tracking2;
//여기 깃헙에 안올라가왜