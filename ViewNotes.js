import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

const ViewNotes = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fetch-notes`);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {notes.map((note, index) => (
                <View key={index} style={styles.card}>
                    <Text>Note ID: {note.NoteID}</Text>
                    <Text>Note: {note.NoteText}</Text>
                    <Text>Created by ID: {note.CreatedByID}</Text>
                    <Text>Primary Recipient ID: {note.PrimaryRecipientID}</Text>
                    <Text>Tagged IDs: {note.TaggedIDs}</Text>
                </View>
            ))}
            <Button title="Add Note" onPress={() => navigation.navigate('AddNote')} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginVertical: 5,
    }
});

export default ViewNotes;
