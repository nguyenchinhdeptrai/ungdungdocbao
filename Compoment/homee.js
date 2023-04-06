import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home1 from './homeScreen/home1';
import Home2 from './homeScreen/home2';
import Home3 from './homeScreen/home3';
import Home4 from './homeScreen/home4';
//import icon
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//


const Tab = createBottomTabNavigator();
const TrangChu123 = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home1} options={{
                    headerShown: false, tabBarIcon: ({ color, size }) => {
                        return (
                            <AntDesign name="home" size={size} color={color} />
                        )
                    }
                }} />
                <Tab.Screen name="UpLoad" component={Home2} options={{
                    headerShown: false, tabBarIcon: ({ color, size }) => {
                        return (
                            <AntDesign name="cloudupload" size={size} color={color} />
                        )
                    }
                }} />
                <Tab.Screen name="Notification" component={Home3} options={{
                    headerShown: false, tabBarIcon: ({ color, size }) => {
                        return (
                            <Feather name="message-circle" size={size} color={color} />
                        )
                    }
                }} />
                <Tab.Screen name="Profile" component={Home4} options={{
                    headerShown: false, tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name="ios-person-circle-outline" size={size} color={color} />
                        )
                    }
                }} />
            </Tab.Navigator>
            <StatusBar style='auto' />
        </View>
    )
}

export default TrangChu123

const styles = StyleSheet.create({})