import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const apiUrl = "http://10.0.2.2:3000"; // Use 'localhost' if on iOS simulator, '10.0.2.2' for Android emulator, or your local network IP if on a physical device.

  const fetchData = async () => {
    console.log("API URL:", apiUrl);
    try {
      const response = await axios.get(`${apiUrl}/fetch-data`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={fetchData}>
        <Text>Fetch Data</Text>
      </Pressable>
      <ScrollView>
        {data.map((contact, index) => (
          <Card key={index}>
            <Card.Title>{contact.FirstName} {contact.LastName}</Card.Title>
            <Card.Divider />
            <Text style={styles.cardText}>Age: {contact.Age}</Text>
            <Text style={styles.cardText}>ID: {contact.ID}</Text>
            <Text style={styles.cardText}>Notes Created: {contact.NotesCreatedIDs}</Text>
            <Text style={styles.cardText}>Notes Tagged: {contact.NotesTaggedIDs}</Text>
            <Text style={styles.cardText}>Primary Notes Tagged: {contact.NotesPrimaryTaggedIDs}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardText: {
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
});

export default App;
