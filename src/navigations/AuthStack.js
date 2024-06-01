
import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // 하단 탭 네비게이터 추가
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Signup1 from "../screens/Signup1";
import Signup2 from "../screens/Signup2";
import Recording from "../screens/Recording";
import ECG from "../screens/ECG";
import Profile from "../screens/Profile";
import Tracking from "../screens/Tracking";
import Tracking2 from "../screens/Tracking2";
import SleepSound from "../screens/SleepSound";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EcgCheck from "../screens/EcgCheck";
import Result from "../screens/Result";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // 하단 탭 네비게이터 생성

// 하단 탭 네비게이터 구성
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,  // 모든 탭에서 헤더를 숨김
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Tracking"
        component={Tracking}
        options={{
          tabBarLabel: 'Tracking',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sleep" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen 
        name="Tracking2"
        component={Tracking2}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bed" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen 
        name="EcgCheck" 
        component={EcgCheck}
        options={{
          tabBarLabel: 'ECG',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="SleepSound" 
        component={Recording}
        options={{
          tabBarLabel: 'Recording',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen 
        name="Result" 
        component={Result}
        options={{
          tabBarLabel: 'Result',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check" color={color} size={size} />
          ),
        }}
      />

    



    </Tab.Navigator>
  );
}


const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: '#F1E7DF' },
        headerShown: false, // 모든 스택 화면에서 헤더를 숨김
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} /> 
      <Stack.Screen name="ECG" component={ECG} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup1" component={Signup1} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="EcgCheck" component={EcgCheck} />
        <Stack.Screen name="Recording" component={Recording} />
        <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};


export default AuthStack;







