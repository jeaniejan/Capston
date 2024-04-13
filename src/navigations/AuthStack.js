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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // 하단 탭 네비게이터 생성

// 주요 화면을 위한 하단 탭 네비게이터 구성
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Tracking" component={Tracking} />
      <Tab.Screen name="SleepSound" component={SleepSound} />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="ECG"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: '#F1E7DF' },
        headerShown: false, // 상단바 숨김
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="ECG" component={ECG} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup1" component={Signup2} />
      <Stack.Screen name="Main" component={MainTabs} /> 
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Tracking" component={Tracking} />
    </Stack.Navigator>
  );
};

export default AuthStack;









/*
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // 하단 탭 네비게이터 생성

// 주요 화면을 위한 하단 탭 네비게이터 구성
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Tracking" component={Tracking} />
      <Tab.Screen name="SleepSound" component={SleepSound} />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: '#F1E7DF' },
        headerShown: false, // 상단바 숨김
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup1" component={Signup2} />
      <Stack.Screen name="Main" component={MainTabs} /> // MainTabs를 스택 네비게이터에 추가
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
};

export default AuthStack;
*/













/*
import React,{useContext} from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Signup1 from "../screens/Signup1";
import Signup2 from "../screens/Signup2";
import Recording from "../screens/Recording";
import ECG from "../screens/ECG";
import Profile from "../screens/Profile";
import Tracking from "../screens/Tracking";
import Tracking2 from "../screens/Tracking2";
import SleepSound from "../screens/SleepSound"

const Stack=createStackNavigator();

const AuthStack=()=>{
    const theme=useContext(ThemeContext);
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitleAlign:'center',
                cardStyle:{backgroundColor:'#F1E7DF'},
                headerShown: false, //상단바숨김
                gestureEnabled: true
            }}
        >
           <Stack.Screen name="Tracking" component={Tracking}/>
           <Stack.Screen name="SleepSound" component={SleepSound}/>       
          <Stack.Screen name="Tracking2" component={Tracking2}/>
          <Stack.Screen name="ECG" component={ECG}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup1" component={Signup2}/>
          <Stack.Screen name="Recording" component={Recording}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Loading" component={Loading}/>


        </Stack.Navigator>
    );
};

export default AuthStack;

*/