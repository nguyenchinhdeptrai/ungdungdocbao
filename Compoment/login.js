import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
//
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login123 = (props) => {
    //
    const [userName, setUserName] = useState('');
    const [validateEmail, setValidateEmail] = useState('');
    const [password, setPasswpord] = useState('');
    //
    const [show, setshow] = useState(false);
    const [visPass, setVisPass] = useState(true);

    //function validate email
    const checkMail = (userName) => {
        console.log(userName);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(userName) === '') {
            // console.log(validateEmail)
            return true;
        } else if (reg.test(userName) === false) {
            console.log(validateEmail)
            setValidateEmail('')
            return false;
        }
        else {
            console.log(validateEmail)
            setValidateEmail('')
            return true;
        }
    }
    //functio  check login
    const DangNhapNe = () => {
        if (userName.length == 0) {
            alert("Chưa nhập username");
            return;
        }
        if (password.length == 0) {
            alert("Chưa Nhập Pass");
            return;
        }
        let url_check = 'http://192.168.1.12:3000/user?email=' + userName;
        console.log(url_check);
        fetch(url_check)
            .then((res) => { return res.json(); })
            .then(async (res_login) => {
                console.log(res_login);
                if (res_login.length != 1) {
                    alert("Sai username hoặc lỗi trùng lặp data");
                    console.log("Lỗi data");
                    return;
                }
                else {
                    // số lượng lấy được 1 bản ghi 
                    let objU = res_login[0];
                    if (objU.password != password) {
                        alert("Sai password");
                        return;
                    } else {
                        //đúng pass thì lưu vào asyn
                        try {
                            await AsyncStorage.setItem('loginInfo', JSON.stringify(objU))
                            //chuyển màn hình
                            props.navigation.navigate('TrangChu')
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            })
    }
    
    return (
        <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 15 }}>

            <Text style={styles.text1}>Hello</Text>
            <Text style={[styles.text1, { color: 'blue' }]}>Again!</Text>
            <Text style={styles.text2}>Welcome back you've {'\n'}been missed</Text>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.text3}>Email</Text>
                <TextInput placeholder='Nhập Email' style={styles.input1}
                    onChangeText={text => {
                        setUserName(text);
                        const isValiMail = checkMail(text);
                        // isValiMail ? setValidateEmail('') : setValidateEmail('Lỗi Email')
                        if (isValiMail === true) {
                            setValidateEmail('');
                            // console.log(validateEmail)
                        } else if (isValiMail === false) {
                            setValidateEmail('Lỗi');
                            console.log(validateEmail)
                        }
                    }}
                    value={userName} autoCorrect={false}
                ></TextInput>
                {userName == '' && validateEmail !== false ? '' : <Text style={{ color: 'red' }}>{validateEmail}</Text>}
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text3}>Password</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput placeholder='Nhập password' style={[styles.input1]}
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
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >
                <View style={{ flexDirection: 'row', marginTop: 1, flex: 1 }}>
                    <BouncyCheckbox fillColor='blue'
                        unfillColor="white"
                        innerIconStyle={{
                            borderRadius: 0, // to make it a little round increase the value accordingly
                        }}
                    />
                    <Text style={{ marginLeft: -10, marginTop: 1 }}>Rember Me</Text>
                </View>
                <Text onPress={() => props.navigation.navigate('ResetPassWord')}>Forgot the password</Text>
            </View>
            <View style={styles.viewbtn}>
                <TouchableOpacity
                    onPress={DangNhapNe}
                    style={styles.btnLogin}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>or continue with</Text>
            <View style={styles.btn2}>
                <TouchableOpacity style={styles.btn22}>
                    <MaterialIcons name="facebook" size={26} color="#1E90FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn22}>
                    <FontAwesome5 name="google" size={21} color="#1E90FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn22} onPress={()=>props.navigation.navigate('TrangChu')}>
                    <AntDesign name="twitter" size={24} color="#1E90FF" />
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => props.navigation.navigate('DangKy')}>Don’t have an account ?  </Text>
            <Text style={{textAlign:'center' ,marginTop:100,color:'gray'}} onPress={()=>props.navigation.navigate('TrangChu')}>Tiếp tục sử dung app khi không đăng nhập</Text>
            <StatusBar style='auto' />

        </View>

    )
    //

}

export default Login123

const styles = StyleSheet.create({
    text1: {
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
        height: 45,
        borderWidth: 1
    }, viewbtn: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    //
    input2: {
        borderColor: 'red',
        borderWidth: 1
    },
    btn2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#1C86EE',
        marginTop: 15,
        borderRadius: 10
    }, btnDangky: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 45,
        backgroundColor: '#B0E0E6',
        marginTop: 10,
        borderRadius: 10
    }, btn22: {
        width: 70,
        height: 40,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF1F4'
    }

})