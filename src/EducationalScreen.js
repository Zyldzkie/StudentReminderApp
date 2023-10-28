import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import ImagePicker from 'react-native-image-picker';

export default function EducationalScreen() {
    const [messages, setMessages] = useState(''); // attach database here

    const [newMessage, setNewMessage] = useState('');
    const [newImage, setNewImage] = useState(null);

    const handleSend = () => {
        if (newMessage.trim() !== '' || newImage !== null) {
            const newId = (messages.length + 1).toString();
            setMessages([...messages, { id: newId, sender: 'User', text: newMessage, image: newImage }]);
            setNewMessage('');
            setNewImage(null);
        }
    };

    const selectImage = () => {
        const options = {
            title: 'Select an Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.uri) {
                setNewImage(response.uri);
            }
        });
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
        width: '60%',
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
