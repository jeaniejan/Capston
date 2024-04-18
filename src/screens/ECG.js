import React from 'react';
import { View, Text } from 'react-native';

const ECG = () => {
  return (
    <View>
      <Text>ECG Screen</Text>
    </View>
  );
};

export default ECG; 




/*
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'; // http요청을 만들기위해 필요함

const ECG = () => {
  // 선택된 파일을 저장하기 위한 상태(state)
  const [file, setFile] = useState(null);

  // 파일 선택 처리 함수
  const selectFile = async () => {
    try {
      // 문서 선택기를 열어 파일을 선택
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // 모든 파일 유형 허용
      });
      console.log(res); // 선택된 파일의 세부 정보를 로그로 출력
      setFile(res); // 선택된 파일로 상태를 업데이트
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 사용자가 문서 선택기를 취소한 경우 처리
        console.log('User cancelled file picker');
      } else {
        // 기타 오류 처리
        console.error('Unknown Error: ', err);
      }
    }
  };

  // 선택된 파일을 업로드하는 함수
  const uploadFile = async () => {
    if (file) {
      // 보낼 파일 데이터를 준비
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri, // 파일 URI
        type: file.type, // 파일 유형
        name: file.name, // 파일 이름
      });

      try {
        // 파일을 업로드하기 위해 HTTP POST 요청을 수행
        const response = await axios({
          url: 'http://your_django_server_endpoint/upload/',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data', // 콘텐츠 유형을 multipart/form-data로 설정
          },
        });
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        // 업로드 중 오류가 발생한 경우 로그로 출력
        console.error('Upload failed:', error);
      }
    } else {
      // 파일이 선택되지 않은 경우 메시지를 출력
      console.log('No file selected');
    }
  };

  // 컴포넌트 UI를 렌더링
  return (
    <View>
      <Text>ECG 화면</Text>
      <Button title="ECG CSV 파일 선택" onPress={selectFile} />
      {file && <Text>선택된 파일: {file.name}</Text>} // 선택된 파일 이름을 표시

      <Button title="파일 업로드" onPress={uploadFile} disabled={!file} />
    </View>
  );
};

export default ECG;
*/
