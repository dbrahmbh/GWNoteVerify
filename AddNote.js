import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const apiUrl = "http://localhost:3000"; // Make sure this matches your backend URL

const AddNote = () => {
    const [noteText, setNoteText] = useState('');
    const [createdByID, setCreatedByID] = useState('');
    const [primaryRecipientID, setPrimaryRecipientID] = useState('');
    const [taggedIDs, setTaggedIDs] = useState('');

    const addNote = async () => {
        try {
            const payload = {
                NoteText: noteText,
                CreatedByID: parseInt(createdByID, 10),
                PrimaryRecipientID: parseInt(primaryRecipientID, 10),
                TaggedIDs: taggedIDs
            };
            const response = await axios.post(`${apiUrl}/add-note`, payload);
            Alert.alert('Success', response.data.message);
        } catch (error) {
            console.error('Error adding note:', error);
            Alert.alert('Error', 'Failed to add note');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Note Text" onChangeText={setNoteText} value={noteText} />
            <TextInput style={styles.input} placeholder="Created by ID" onChangeText={setCreatedByID} value={createdByID} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Primary Recipient ID" onChangeText={setPrimaryRecipientID} value={primaryRecipientID} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Tagged IDs" onChangeText={setTaggedIDs} value={taggedIDs} />
            <Pressable style={styles.button} onPress={addNote}>
                <Text style={styles.buttonText}>Add Note</Text>
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

export default AddNote;
