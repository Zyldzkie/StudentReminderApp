import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';


export default function EducationalScreen() {
    const [messages, setMessages] = useState(''); // attach database here

    const [newMessage, setNewMessage] = useState('');
    const [newImage, setNewImage] = useState('');


    const handleSend = () => {
        if (newMessage.trim() !== '' || newImage !== null) {
            const newId = (messages.length + 1).toString();
            setMessages([...messages, { id: newId, sender: 'User', text: newMessage, image: newImage }]);
            setNewMessage('');
            setNewImage('');
        }
    };

    const selectImage = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            includeBase64: false,
            // title: 'Select an Image',
            // storageOptions: {
            //     skipBackup: true,
            //     path: 'images',
            // },
        
        };
 
        let result = await ImagePicker.launchImageLibraryAsync(options, (response) => {
            if (response.uri) {
                setNewImage(response.uri);
            }
        });

        if (!result.canceled) {
            setNewImage(result.assets[0].uri);
        }        
    };

    const selectFile = async() => {
        console.log("printed")
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);
        console.log(result);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.sender}: {item.text}</Text>
                        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                    </View>
                )}
            />
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableOpacity style={styles.button} onPress={selectImage}>
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={selectFile}>
                    <Text style={styles.buttonText}>Files</Text>
                </TouchableOpacity>                
                <TouchableOpacity style={styles.button} onPress={handleSend}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    
    inputWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        margin: 20,
    },

    textInput: {
        width: '40%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        margin: 5,
        height: 60,
        padding: 5,
        textAlignVertical: 'top',
    },

    button: {
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cyan',
        height: 50,
        margin: 2,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },

    image: {
        width: 100,
        height: 100,
    },
});
