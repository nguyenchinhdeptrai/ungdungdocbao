import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';

const ItemListnew = ({ title, img, id, item, content, openModal }) => {
    
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.container} onPress={openModal}>
                <Image source={{ uri: img }} style={styles.img} />
                <View style={styles.view123}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text numberOfLines={2}>{content}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemListnew

const styles = StyleSheet.create({
    container: {
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