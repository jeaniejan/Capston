import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { ThemeProvider } from 'styled-components';
import {theme} from './theme';
import Navigation from './navigations';
import { StatusBar } from 'expo-status-bar';


const App=()=>{
  return(
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content"/>
      <Navigation/>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B39179',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:30,
  }
});

export default App;
