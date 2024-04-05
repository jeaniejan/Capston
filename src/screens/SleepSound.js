/*
import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av'; // Expo의 Audio API 사용

const SleepSound = () => {
  const [sound, setSound] = useState(null);

  async function playSound() {
    // `require`를 사용하여 오디오 파일 로드
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/sleepsound.m4a')
    );
    setSound(sound);

    // 재생
    await sound.playAsync();
  }

  // 컴포넌트 언마운트 시 사운드 리소스 해제
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>오디오 파일 재생</Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export default SleepSound;
*/