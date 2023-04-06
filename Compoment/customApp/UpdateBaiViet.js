import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//
const UpdateBaiViet = (props) => {
    const [title, settitle] = useState(props.nav.title)
    const [content, setContent] = useState(props.nav.content)
    const [img_base64, setiimg_base64] = useState(null)
    //status 
    const [status, setstatus] = useState(false)
    //function update
    const UpdateSP = () => {
        if (img_base64 == props.nav.img) {
            alert("Bạn Phải Cập Ảnh");
            return;
        }
        let obj = { title: title, content: content, img: img_base64 };
        let id = props.nav.id;
        let uri_api = "http://192.168.77.42:3000/post/" + id;
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
    }
    //fucntion choose img
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
                    setstatus(true);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });
        }
    }
    //
    // xóa sp
    const xoaSP = () => {
        //
        Alert.alert(
            'Bài viết Sẽ Mất',
            'Bạn Chắc chắn muốn xóa bài viết này chứ ? ',
            [
                // mảng nút bấm
                {
                    text: 'Có',
                    onPress: () => {   // sự kiện bấm nút
                        console.log('Đã chọn YES');
                        let id = props.nav.id;
                        let uri_api = "http://192.168.77.42:3000/post/" + id;
                        fetch(uri_api, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }).then((res) => {
                            if (res.status == 200)
                                alert('Xóa Thành Công');
                            GetList123();
                        }).catch((err) => { console.log(err); });
                    },
                    style: 'default'
                },
                {
                    text: 'Không',
                    onPress: () => { console.log('No no no no no'); }
                }
            ],
            {
                cancelable: true,
                onDismiss: () => { // được gọi khi người dùng bấm nút back trên điện thoại
                    console.log('Dialog bị tắt không theo nút bấm');
                }
            }
        );
    }

    return (
        <View style={{ alignItems: 'center', marginTop: -45 }}>
            <View style={{ alignItems: 'center', marginVertical: 15 }}>
                <Text style={styles.title}>Cập Nhật Bài Viết</Text>
            </View>
            <TouchableOpacity style={styles.chooseimg} onPress={pickImage}>
                {(status) ?
                    (<Image source={{ uri: img_base64 }} style={styles.img} />) :
                    (<Image source={{ uri: props.nav.img }} style={styles.img} />)}
            </TouchableOpacity>

            <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
                <Text>Tiêu Đề Bài Viết</Text>
                <TextInput placeholder='' onChangeText={(txt) => settitle(txt)} value={title} style={styles.input} numberOfLines={1} multiline={true} />
            </View>
            <View style={{ width: '100%', paddingHorizontal: 10, height: 200 }}>
                <Text>Nội Dung Bài Viết</Text>
                <TextInput placeholder='' onChangeText={(txt) => setContent(txt)} value={content} style={styles.input2} numberOfLines={2} multiline={true} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.btnUp} onPress={UpdateSP}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Sửa Bài Viết</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnUp} onPress={xoaSP}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Xóa Bài Viết</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateBaiViet

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#5CACEE',
    }, chooseimg: {
        width: '70%',
        height: 220,
        alignItems: 'center'
    }, img: {
        width: '70%',
        height: 220,
        backgroundColor: 'red'
    }, input: {
        width: '100%',
        height: 50,
        padding: 10,
        borderBottomWidth: 1,
        marginVertical: 5,
        borderRadius: 12,
        fontSize: 20
    }, input2: {
        height: 75,
        padding: 10,
        marginVertical: 5,
        borderRadius: 12,
        width: '100%'
    }, btnUp: {
        width: '45%',
        height: 50,
        backgroundColor: '#1C86EE',
        marginTop: 30,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    }
})