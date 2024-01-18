import React,{useContext} from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Signup1 from "../screens/Signup1";
import Signup2 from "../screens/Signup2";
import Recording from "../screens/Recording";

const Stack=createStackNavigator();

const AuthStack=()=>{
    const theme=useContext(ThemeContext);
    return(
        <Stack.Navigator
            initialRouteName="Recording"
            screenOptions={{
                headerTitleAlign:'center',
                cardStyle:{backgroundColor:'#F1E7DF'},
                headerShown: false, //상단바숨김
                gestureEnabled: true
            }}
        >

          <Stack.Screen name="Recording" component={Recording}/>
          <Stack.Screen name="Signup1" component={Signup1}/>
          <Stack.Screen name="Signup2" component={Signup2}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Loading" component={Loading}/>

        </Stack.Navigator>
    );
};

export default AuthStack;