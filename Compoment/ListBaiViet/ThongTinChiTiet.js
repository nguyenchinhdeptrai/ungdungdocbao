import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThongTinChiTiet = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' ,marginTop:-32}}>
                <ScrollView style={{ width: '90%' }}>
                    <Text style={styles.title}>Thông tin chi tiết</Text>
                    <Image source={{ uri: props.nav.img }} style={styles.img} />
                    <Text style={styles.title2}>{props.nav.title}</Text>
                    <Text style={styles.content}>{props.nav.content}</Text>
                </ScrollView>
                <View style={{flexDirection:'row'}}>

                </View>
            </View>
        </View>
    )
}

export default ThongTinChiTiet

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10
    }, img: {
        width: '100%',
        height: 220,
        borderRadius: 10
    }, title2: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 5
    }, content: {
        paddingBottom: 10
    }
})