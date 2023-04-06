import { StyleSheet, Text, View, TextInput, TouchableOpacity , Image } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
//
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//
// https://docs.expo.dev/versions/latest/sdk/imagepicker/
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemreadasstringasyncfileuri-options
// https://docs.expo.dev/versions/latest/sdk/filesystem/#readingoptions


const DangKy123 = (props) => {
    //
    const [password, setPasswpord] = useState('');
    //
    const [show, setshow] = useState(false);
    const [visPass, setVisPass] = useState(true);
    //
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [img_base64, setiimg_base64] = useState(null)
    //fuction đăng ký
    const DangKyThanhVien = () =>{
        if(username.length == 0){
            alert('Fullname Rỗng');
            return;
        }
        if(password.length == 0){
            alert('Password Rỗng');
            return;
        }
        if(email.length == 0){
            alert('Email Rỗng');
            return;
        }
        let obj = {fullname:username , password:password , email:email , img: img_base64}
        let uri_api = 'http://192.168.77.42:3000/user';
        fetch(uri_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then((res) => {
            if (res.status == 201)
                alert("Đăng Ký Thành Công");
        }).catch((err) => { console.log(err); });
    }

    //load  ảnh
    
    const pickImage = async () => {
        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            //setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    console.log(img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });
        }
    }
    //validate email
    const [validateEmail, setValidateEmail] = useState('');
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
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 150 }}>
                   <TouchableOpacity onPress={pickImage}>
                   <Image source={{uri:img_base64}} style={styles.viewimg}/>
                   </TouchableOpacity>
                <Feather name="camera" size={17} color="white"
                    style={{ marginTop: 110, marginLeft: -40, padding: 6, backgroundColor: 'blue', borderRadius: 20 }} />
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.text3}>Email</Text>
                <TextInput placeholder='Nhập Email' style={styles.input}
                    onChangeText={text => {
                        setemail(text);
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
                    value={email}
                    
                ></TextInput>
                {email == '' && validateEmail !== false ? '' : <Text style={{ color: 'red' }}>{validateEmail}</Text>}
            </View>
            <View style={styles.viewinput}>
                <Text style={{ fontSize: 16, paddingVertical: 3 }}>Fullname</Text>
                <TextInput placeholder='' style={styles.input} onChangeText={(txt) => setusername(txt)} />
            </View>
            <Text style={{
                fontSize: 15,
                paddingVertical: 5
            }}>Nhập PassWord</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput placeholder='Password dài từ 6-12 ký tự' style={[styles.input, { width: '100%' }]}
                    onChangeText={text => {
                        setPasswpord(text);
                        if (password.length < 8) {
                            console.log('Lỗi pass')
                        }
                    }}
                    value={password}
                    secureTextEntry={visPass}
                ></TextInput>
                <TouchableOpacity onPress={() => {
                    setVisPass(!visPass)
                    setshow(!show)
                }}>
                    <Feather name={show === false ? "eye-off" : "eye"} size={24} color="black" style={{ marginLeft: -32, marginTop: 8 }} />
                </TouchableOpacity>

            </View>
            {password.length != '' && password.length < 8 ? <Text>Lỗi Pass</Text> : ''}

            <TouchableOpacity style={styles.btn} onPress={DangKyThanhVien}>
                <Text>Đăng Ký</Text>
            </TouchableOpacity>
        </View>

    )
}

export default DangKy123

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, viewimg: {
        width: 120,
        height: 120,
        backgroundColor: '#EEF1F4',
        borderRadius: 90,
        marginTop: 10,
        marginLeft: -20,
        alignItems: 'center',
    }, viewinput: {
        marginTop: 10
    }, input: {
        borderWidth: 1,
        height: 40,
        borderRadius: 15,
        padding: 10
    }, btn: {
        marginTop: 130,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6699FF',
        width: '100%',
        height: 50,
        borderRadius: 10
    }
})