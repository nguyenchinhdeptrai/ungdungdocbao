import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
//create navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrangChu123 from './Compoment/homee';
import React, { useState, useEffect } from 'react'

import ResetPassWord123 from './Compoment/resetPass';
import DangKy123 from './Compoment/dangKy';
import Login123 from './Compoment/login';


export default function App() {
  //
  const StackDemo = createNativeStackNavigator();
  //chuyển trang


  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StackDemo.Navigator initialRouteName='TrangChu'>
          <StackDemo.Screen name='TrangChu' component={TrangChu123} options={{ headerShown: false }} />
          <StackDemo.Screen name='ResetPassWord' component={ResetPassWord123} options={{ title: '' }} />
          <StackDemo.Screen name='DangKy' component={DangKy123} options={{ title: '             Đăng Ký' }} />
          <StackDemo.Screen name='Login' component={Login123} options={{ headerShown: false }} />
        </StackDemo.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: 'column',

  }, text1: {
    fontSize: 36,
    fontWeight: 'bold',
  }, text2: {
    fontSize: 17,
    top: 5,
  }, text3: {
    marginBottom: 5,
    color: 'gray',
    fontSize: 16
  }, input1: {
    width: '100%',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#EEEEE0',
    height: 40
  }, btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 45,
    backgroundColor: 'lightblue',
    marginTop: 10,

  }, viewbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  //
  input2: {
    borderColor: 'red',
    borderWidth: 1
  }

});
