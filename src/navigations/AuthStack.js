import React,{useContext} from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack=createStackNavigator();

const AuthStack=()=>{
    const theme=useContext(ThemeContext);
    return(
        <Stack.Navigator
            initialRouteName="Signup"
            screenOptions={{
                headerTitleAlign:'center',
                cardStyle:{backgroundColor:'#F1E7DF'},
                headerShown: false, //상단바숨김
                gestureEnabled: true
            }}
        >
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Loading" component={Loading}/>

        </Stack.Navigator>
    );
};

export default AuthStack;