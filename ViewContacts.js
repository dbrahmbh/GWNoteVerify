import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

const ViewContacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fetch-data`);
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {contacts.map((contact, index) => (
                <View key={index} style={styles.card}>
                    <Text>{contact.FirstName} {contact.LastName}</Text>
                    <Text>Age: {contact.Age}</Text>
                    <Text>ID: {contact.ID}</Text>
                </View>
            ))}
            <Button title="Add Contact" onPress={() => navigation.navigate('AddContact')} />
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

export default ViewContacts;
