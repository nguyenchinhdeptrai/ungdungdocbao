import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons'; 
//img
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const Home2 = (props) => {
  const [loginInfo, setloginInfo] = useState('');
  //status load anh
  const [img_base64, setiimg_base64] = useState(null)
  //
  const [Title, setTitle] = useState('')
  const [content, setcontent] = useState('')
  //lấy data từ bộ nhớ đt
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo')
      if (value !== null) {
        setloginInfo(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
  //load datâ
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getData();
      setloginInfo('');
      console.log(loginInfo.role)
      // Logout();
    });

    return unsubscribe;
  }, [props.navigation]);
  //function load img
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
  //function add new post
  const SaveData = () => {
    if (Title.length == 0) {
      alert("Tiêu đề rỗng");
      return;
    }
    if (content.length == 0) {
      alert("Nội Dung rỗng");
      return;
    }
    if (img_base64.length == 0) {
      alert('Phải thêm ảnh để hoàn chỉnh bài viết');
      return;
    }
    //add
    let obj = { title: Title, img: img_base64, content: content }
    let uri_api = 'http://192.168.77.42:3000/post';
    fetch(uri_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.status == 201)
        alert("Thêm bài viết thành công");
      setTitle('');
      setcontent('');
      setiimg_base64(null);
    }).catch((err) => { console.log(err); });
  }

  return (
    <View style={styles.container}>
      {loginInfo.role == 0 ?
        (<View style={styles.view22}>
          <View style={styles.view22}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF', paddingTop: 20 }}>Tạo Bảng Tin Mới</Text>
            <TouchableOpacity style={styles.view1} onPress={pickImage}>
              {(img_base64 == null) ?
                (<View style={{ marginTop: 1, alignItems: 'center' }}>
                  <FontAwesome name="plus-square-o" size={24} color="gray" />
                  <Text>Add a new photo</Text>
                </View>) :
                (<Image style={{ width: 220, height: 120, marginTop: 1 }} source={{ uri: img_base64 }}>
                </Image>)}
            </TouchableOpacity>
            <View style={{ height: 350, width: '100%' }}>
              <TextInput placeholder='New Titles' style={styles.input} multiline={true} onChangeText={(txt) => setTitle(txt)} autoCorrect={false} />
              <TextInput placeholder='Add News/Article' style={styles.input2} multiline={true} onChangeText={(txt) => setcontent(txt)} />
            </View>
            <View style={styles.view2}>
              <TouchableOpacity style={styles.btn} onPress={SaveData}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Đăng Bài</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>) :
        (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 20, }}>Bạn Không thể thực hiện thao tác này</Text>
          <FontAwesome5 name="sad-cry" size={24} color="black" />
        </View>)}

    </View>
  )
}

export default Home2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    width: '100%'
  }, view1: {
    width: 220,
    height: 120,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }, input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 12,
    padding: 10,
    fontSize: 18
  }, input2: {
    width: '100%',
    padding: 5,
    marginLeft: 8,
  }, view22: {
    width: '100%',
    height: 120,
    borderTopWidth: 0.7,
    alignItems: 'center',
    borderColor: 'gray'
  }, btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 50,
    backgroundColor: '#6699FF',
    borderRadius: 12,
    marginTop: 25,
  }, view2: {
    width: 320,
    height: 320
  }, txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 120,
    width: '90%',
    textAlign: 'center',
    marginHorizontal: 20
  }, txt2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 120,
    width: '90%',
    textAlign: 'center',
    marginHorizontal: 20,
    height: '100%'
  }
})