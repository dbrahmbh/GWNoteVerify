import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';

const apiUrl = "http://localhost:3000";

const AddNote = ({ navigation }) => { // Ensure navigation is passed to this component for redirection
    const [noteText, setNoteText] = useState('');
    const [createdByID, setCreatedByID] = useState('');
    const [primaryRecipientID, setPrimaryRecipientID] = useState('');
    const [taggedIDs, setTaggedIDs] = useState('');
    const [contacts, setContacts] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fetch-contacts`);
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                Alert.alert('Error', 'Failed to fetch contacts: ' + error.message);
            }
        };

        fetchContacts();
    }, []);

    const findContact = (query) => {
        if (query === '') {
            return [];
        }

        const regex = new RegExp(`${query.trim()}`, 'i');
        return contacts.filter(contact => contact.FirstName.search(regex) >= 0 || contact.LastName.search(regex) >= 0);
    };

    const addNote = async () => {
        try {
            const payload = {
                NoteText: noteText,
                CreatedByID: parseInt(createdByID, 10),
                PrimaryRecipientID: parseInt(primaryRecipientID, 10),
                TaggedIDs: taggedIDs
            };
            await axios.post(`${apiUrl}/add-note`, payload);
            Alert.alert('Success', 'Note added successfully', [
                { text: "OK", onPress: () => navigation.navigate('ViewNotes') }
            ]);
        } catch (error) {
            console.error('Error adding note:', error);
            Alert.alert('Error', 'Failed to add note');
        }
    };

    const data = findContact(query);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Note Text"
                onChangeText={setNoteText}
                value={noteText}
            />
            <TextInput
                style={styles.input}
                placeholder="Created by ID"
                onChangeText={setCreatedByID}
                value={createdByID}
                keyboardType="numeric"
            />
            <Autocomplete
                data={data}
                defaultValue={query}
                onChangeText={setQuery}
                placeholder="Type Primary Recipient Name"
                flatListProps={{
                    keyExtractor: item => item.ID.toString(),
                    renderItem: ({ item }) => (
                        <Pressable onPress={() => {
                            setPrimaryRecipientID(item.ID.toString());
                            setQuery(item.FirstName + ' ' + item.LastName);  // This correctly updates the visible text field
                        }}>
                            <Text>{item.FirstName} {item.LastName}</Text>
                        </Pressable>
                    ),
                    style: { maxHeight: 120 }
                }}
                renderTextInput={(props) => (
                    <TextInput
                        {...props}
                        style={styles.input}
                        onChangeText={text => setQuery(text)}
                        value={query}
                    />
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Tagged IDs"
                onChangeText={setTaggedIDs}
                value={taggedIDs}
            />
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
