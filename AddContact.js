import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const apiUrl = "http://localhost:3000"; // Ensure this matches your server address

const AddContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [notesCreatedIDs, setNotesCreatedIDs] = useState('');
    const [notesTaggedIDs, setNotesTaggedIDs] = useState('');
    const [notesPrimaryTaggedIDs, setNotesPrimaryTaggedIDs] = useState('');

    const addUser = async () => {
        try {
            const payload = {
                FirstName: firstName,
                LastName: lastName,
                Age: parseInt(age, 10),
                NotesCreatedIDs: notesCreatedIDs,
                NotesTaggedIDs: notesTaggedIDs,
                NotesPrimaryTaggedIDs: notesPrimaryTaggedIDs
            };
            const response = await axios.post(`${apiUrl}/add-user`, payload);
            Alert.alert('Success', response.data.message);
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Failed to add user');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
            <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
            <TextInput style={styles.input} placeholder="Age" onChangeText={setAge} value={age} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Notes Created IDs" onChangeText={setNotesCreatedIDs} value={notesCreatedIDs} />
            <TextInput style={styles.input} placeholder="Notes Tagged IDs" onChangeText={setNotesTaggedIDs} value={notesTaggedIDs} />
            <TextInput style={styles.input} placeholder="Primary Notes Tagged IDs" onChangeText={setNotesPrimaryTaggedIDs} value={notesPrimaryTaggedIDs} />
            <Pressable style={styles.button} onPress={addUser}>
                <Text style={styles.buttonText}>Add User</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
    }
});

export default AddContact;
