import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl, Modal, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateMyProfile from '../customApp/updateMyProfile';
import Login123 from '../login';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemListnew from '../ListBaiViet/itemListnew';
import UpdateBaiViet from '../customApp/UpdateBaiViet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Home4 = (props) => {
  const StackDemo = createNativeStackNavigator();
  const [loginInfo, setloginInfo] = useState('')
  //useState get list all
  const [ds, setds] = useState([]);
  //status
  const [isReaload, setisReaload] = useState(false)
  //
  const [count, setcount] = useState('')
  //function get list
  const GetList123 = async () => {
    let uri_api = "http://192.168.77.42:3000/post";
    try {
      const response = await fetch(
        uri_api,
      );
      const json = await response.json();
      setds(json)
      const count = json.length;
      setcount(count);
    } catch (error) {
      console.error(error);
    }
  }
  //callBack
  const ReloadData = React.useCallback(() => {
    setisReaload(true);
    GetList123();
    setisReaload(false);
  })
  //useEffect

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    console.log(item.id)
  }
  //
  const Profile = () => {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', marginLeft: 40,alignItems:'center' }}>
            <Image style={styles.viewimg} source={{ uri: loginInfo.img }} />
            <Text style={{ marginLeft: -30, marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>{loginInfo.fullname}</Text>
            {(loginInfo.role == 0) ? (<Text style={{ marginLeft: -30, marginTop: 1 }}>Admin</Text>) : (<Text style={{ marginLeft: -35, marginTop: 1 }}>Người dùng</Text>)}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', margin: 20, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>2999</Text>
              <Text>Followers</Text>
            </View>
            <View style={{ flexDirection: 'column', marginVertical: 19, marginLeft: 20, alignItems: 'center' }}>
              {(loginInfo.role == 0) ?
                (<Text style={{ fontWeight: 'bold' }}>{count}</Text>) :
                ('')}
              <Text style={{}}>News</Text>
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between'
          , marginTop: 10, height: 80, paddingTop: 15
        }}>
          {loginInfo.fullname != null ? <TouchableOpacity style={styles.btn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={Logout}>Đăng Xuất</Text>
          </TouchableOpacity> : <TouchableOpacity style={styles.btn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Login')}>Đăng Nhập</Text>
          </TouchableOpacity>}
          {loginInfo.fullname != null ? <TouchableOpacity style={styles.btn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={() => props.navigation.navigate('File2', { loginInfo })}>Chỉnh Sửa Thông Tin</Text>
          </TouchableOpacity> : <TouchableOpacity style={styles.btn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={() => props.navigation.navigate('DangKy')}>Đăng Ký</Text>
          </TouchableOpacity>}
        </View>
        {(loginInfo.role == 0) ? (<View style={{ height: '80%', borderTopWidth: 1 }}>
          <Text style={{ padding: 5 }}>Bài Viết của tôi </Text>
          <ScrollView style={{}}
            refreshControl={<RefreshControl
              refreshing={isReaload}
              onRefresh={ReloadData}>
            </RefreshControl>}>
            {ds.map((item, index, arr) => {
              return <ItemListnew key={index}
                title={item.title}
                img={item.img}
                id={item.id}
                item={item}
                content={item.content}
                openModal={() => openModal(item)}
              />
            })}
            <Modal visible={showModal}
              transparent={false}
              animationType='slide'
              onRequestClose={
                () => {
                  //xay ra khi bấm nút back trên đt
                  setShowModal(false);
                }
              }>
              {/* nếu selectedItem null thì không thực hiện lệnh ui bên trong */}
              {selectedItem && (
                <View>
                  <TouchableOpacity onPress={() => setShowModal(false)} style={{ marginTop: 20, marginLeft: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                  <UpdateBaiViet nav={selectedItem} />
                </View>
              )}
            </Modal>
          </ScrollView>
        </View>) : (<View style={{ borderTopWidth: 0.5, alignItems: 'center', justifyContent: 'center', height: 400 }}>
          <Text style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>Bạn Cần Đăng Nhập Với Tư Cách Admin Để Xem Danh Sách Bài Viết</Text>
          <MaterialCommunityIcons name="login" size={30} color="black" />
        </View>)}
      </View>

    )
  }
  //lấy thông tin
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
  // đăng xuât
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('loginInfo');
      setloginInfo('');
      console.log('Done.');
      props.navigation.navigate('Login');
    } catch (e) {
      console.log(e);
      // remove error
    }

  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
      GetList123();// gọi hàm load dữ liệu
      // Logout();
    });

    return unsubscribe;
  }, [props.navigation]);
  return (
    <StackDemo.Navigator>
      <StackDemo.Screen name='File1' component={Profile} options={{ headerShown: false }} />
      <StackDemo.Screen name='File2' component={UpdateMyProfile} options={{ title: 'Update My Profile' }} />
      <StackDemo.Screen name='Flie3' component={Login123} options={{ headerShown: false }} />
    </StackDemo.Navigator>
  )
}

export default Home4

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15
  }, viewimg: {
    width: 90,
    height: 90,
    backgroundColor: '#EEF1F4',
    borderRadius: 90,
    marginTop: 10,
    marginLeft: -20,
    alignItems: 'center',
  }, viewUpdate: {

  }, btn: {
    width: 180,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#6699FF',
    alignItems: 'center',
    justifyContent: 'center'
  }
})