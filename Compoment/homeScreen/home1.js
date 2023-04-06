import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, RefreshControl, Image, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ItemListnew from '../ListBaiViet/itemListnew';
import { Dimensions } from 'react-native';
import ThongTinChiTiet from '../ListBaiViet/ThongTinChiTiet';
import { Ionicons } from '@expo/vector-icons'; 

const Home1 = (props) => {
  //home 
  const StackDemo = createNativeStackNavigator();
  const HomeChu = () => {
    //function search data
    const [search, setsearch] = useState('')
    //list data
    const [ds, setds] = useState([]);
    //status
    const [isReaload, setisReaload] = useState(false)
    //count arraylis

    //function get list
    const GetList123 = async () => {
      let uri_api = "http://192.168.77.42:3000/post";
      try {
        const response = await fetch(
          uri_api,
        );
        const json = await response.json();
        setds(json)
      } catch (error) {
        console.error(error);
      }
    }
    //callBack
    const ReloadData = React.useCallback(() => {
      setisReaload(true);
      if (search != '') {
        Search();
      } else {
        GetList123();
      }
      setisReaload(false);
    })
    //
    React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        // do something
        GetList123();// gọi hàm load dữ liệu
      });

      return unsubscribe;
    }, [props.navigation]);
    //function search
    const Search = async () => {
      let uri_search = 'http://192.168.77.42:3000/post?title=' + search;
      console.log(uri_search);
      try {
        const response = await fetch(
          uri_search,
        );
        const json = await response.json();
        setds(json)
      } catch (error) {
        console.error(error);
      }
    }
    //item list new 
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const openModal = (item) => {
      setSelectedItem(item);
      setShowModal(true);
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Trending</Text>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#6699FF" style={styles.chuong} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'blue', borderRadius: 10, marginTop: 20 }}>
          <TouchableOpacity onPress={Search}>
            <MaterialCommunityIcons name="book-search" size={25} color="black" style={{ marginTop: 6, marginLeft: 5 }} />
          </TouchableOpacity>
          <TextInput placeholder='Nhập Thông Tin'
            onChangeText={(txt) => setsearch(txt)}
            style={{
              width: '100%', height: 40, marginLeft: 7, borderLeftWidth: 0.5, paddingLeft: 8, borderColor: 'gray'
            }}></TextInput>
        </View>
        <View style={{ height: '80%', }}>
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

          </ScrollView>
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
                <TouchableOpacity onPress={() => setShowModal(false)} style={{ marginTop: 30, marginLeft: 10 }}>
                  <Text><Ionicons name="arrow-back" size={24} color="black" /></Text>
                </TouchableOpacity>
                <ThongTinChiTiet nav={selectedItem} />
              </View>
            )}
          </Modal>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StackDemo.Navigator initialRouteName='DangKy222'>
        <StackDemo.Screen name='DangKy222' component={HomeChu} options={{ headerShown: false }} />
      </StackDemo.Navigator>
    </View>
  )
}

export default Home1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }, text: {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6699FF'
  }, chuong: {
    marginTop: 22,
    marginRight: 15,

  },
  container123: {
    flexDirection: 'row',
    marginTop: 10
  }, view123: {
    marginLeft: 15,
    width: Dimensions.get('window').width - 105
  }, img: {
    width: 60,
    height: 65,
    borderRadius: 5,
    marginLeft: 10
  }, title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  }
})