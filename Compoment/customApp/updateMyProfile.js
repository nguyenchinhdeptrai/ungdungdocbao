import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
//
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const UpdateMyProfile = ({ route }) => {
  const { loginInfo } = route.params;
  //
  const [fullname, setfullname] = useState(route.params.loginInfo.fullname);
  const [password, setPassword] = useState(route.params.loginInfo.password);
  const [email, setemail] = useState(route.params.loginInfo.email);
  const [role, setrole] = useState(route.params.loginInfo.role)
  //img
  const [img_base64, setiimg_base64] = useState(null)
  //status
  const [status, setstatus] = useState(true)
  //function upload img
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
          setstatus(false);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });
    }
  }
  //function update data
  const UpdateSP = () => {
    if (role == 0) {
      let obj = { fullname: fullname, password: password, email: email, img: img_base64, role: 0 };
      let id = route.params.loginInfo.id;
      let uri_api = "http://192.168.77.42:3000/user/" + id;
      console.log(id);
      fetch(uri_api, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.status == 200)
          alert('Sửa thành công');

      }).catch((err) => {
        console.log(err);
      });;

    } else {
      let obj = { fullname: fullname, password: password, email: email, img: img_base64, role: 1 };
      let id = route.params.loginInfo.id;
      let uri_api = "http://192.168.1.12:3000/user/" + id;
      console.log(id);
      fetch(uri_api, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.status == 200)
          alert('Sửa thành công');

      }).catch((err) => {
        console.log(err);
      });
    }


  }
  //load data
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>Chỉnh Sửa Thông Tin</Text>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          {(status) ?
            (<Image source={{ uri: loginInfo.img }} style={styles.img} />) :
            (<Image source={{ uri: img_base64 }} style={styles.img} />)}
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 17 }}>Cập nhật hình đại diện</Text>
        <View style={styles.view1}>
          <Text>Họ Tên:</Text>
          <TextInput placeholder='' value={fullname} style={styles.input} onChangeText={(txt) => setfullname(txt)} />
        </View>
        <View style={styles.view1}>
          <Text>Email:</Text>
          <TextInput placeholder='' value={email} style={styles.input} onChangeText={(txt) => setemail(txt)} />
        </View>
        <View style={styles.view1}>
          <Text>Password:</Text>
          <TextInput placeholder='' value={password} style={styles.input} onChangeText={(txt) => setPassword(txt)} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 40, borderTopWidth: 0.3 }}>
          <TouchableOpacity style={styles.btnUp} onPress={UpdateSP}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Chỉnh sửa tài khoản</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default UpdateMyProfile

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15
  }, view1: {
    marginVertical: 10
  }, input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    padding: 10
  }, img: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 50
  }, btn: {
    alignItems: 'center',
    justifyContent: 'center',
  }, btnUp: {
    width: '65%',
    height: 60,
    backgroundColor: '#009ACD',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})