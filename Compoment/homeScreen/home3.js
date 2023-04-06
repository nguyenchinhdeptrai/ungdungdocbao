import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Home3 = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginVertical: 5 }}>Thông Báo</Text>
      <View style={styles.view1}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Tuần Này</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/Capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            <Text style={{ marginLeft: 15,width:220 }}>Her train broke down. Her phone died. And then she met her...</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>Theo Dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.view1}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Tháng Này</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/Capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            <Text style={{ marginLeft: 15,width:220 }}>Her train broke down. Her phone died. And then she met her...</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>Theo Dõi</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/Capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            <Text style={{ marginLeft: 15,width:220 }}>Her train broke down. Her phone died. And then she met her...</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>Theo Dõi</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/Capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            <Text style={{ marginLeft: 15,width:220 }}>Her train broke down. Her phone died. And then she met her...</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>Theo Dõi</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/Capture.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            <Text style={{ marginLeft: 15,width:220 }}>Her train broke down. Her phone died. And then she met her...</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>Theo Dõi</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  )
}

export default Home3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:15
  }, view1: {
    marginLeft: 1,
    marginTop: 10
  },btn:{
    width:90,
    height:30,
    backgroundColor:'#6699FF',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    marginLeft:-10,
    marginTop:5
  }
})