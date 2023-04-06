import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'


const ResetPassWord123 = () => {
    const [password, setPasswpord] = useState('');
    //
    const [show, setshow] = useState(false);
    const [visPass, setVisPass] = useState(true);
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Reset</Text>
            <Text style={styles.text1}>PassWord</Text>
            <Text style={{
                fontSize: 15,
                paddingVertical: 5
            }}>Nhập PassWord</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput placeholder='Password dài từ 6-12 ký tự' style={[styles.input1]}
                    onChangeText={text => {
                        setPasswpord(text);
                        if (password.length < 8) {
                            console.log('Lỗi pass')
                        }
                    }}
                    value={password}
                    secureTextEntry={visPass}

                ></TextInput>
                {/* eye */}
                <TouchableOpacity onPress={() => {
                    setVisPass(!visPass)
                    setshow(!show)
                }}>
                    <Feather name={show === false ? "eye-off" : "eye"} size={24} color="black" style={{ marginLeft: -32, marginTop: 8 }} />
                </TouchableOpacity>

            </View>
            {password.length != '' && password.length < 8 ? <Text>Lỗi Pass</Text> : ''}
            <Text style={{
                fontSize: 15,
                paddingVertical: 5
            }}>Nhập Lại Password</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput placeholder='Password dài từ 6-12 ký tự' style={[styles.input1]}
                    onChangeText={text => {
                        setPasswpord(text);
                        if (password.length < 8) {
                            console.log('Lỗi pass')
                        }
                    }}
                    value={password}
                    secureTextEntry={visPass}

                ></TextInput>
                {/* eye */}
                <TouchableOpacity onPress={() => {
                    setVisPass(!visPass)
                    setshow(!show)
                }}>
                    <Feather name={show === false ? "eye-off" : "eye"} size={24} color="black" style={{ marginLeft: -32, marginTop: 8 }} />
                </TouchableOpacity>

            </View>
            {password.length != '' && password.length < 8 ? <Text>Lỗi Pass</Text> : ''}
            <View style={styles.view1}>
                <TouchableOpacity style={styles.btn1} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPassWord123

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text1: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 5
    }, text3: {
        marginBottom: 5,
        color: 'gray',
        fontSize: 16
    },
    input1: {
        width: '100%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#EEEEE0',
        height: 40
    },
    view1: {
        top: 320,
        borderTopWidth: 0.5,
        borderColor: '#888888',
        alignItems: 'center',
        justifyContent: 'center'
    }, btn1: {
        width: 300,
        height: 40,
        backgroundColor: '#33CCFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30
    }

})