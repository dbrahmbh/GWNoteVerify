import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewNotes from './ViewNotes';
import ViewContacts from './ViewContacts'; // Ensure this import if not already there
import LandingPage from './LandingPage'; // Make sure the path matches where you saved this file

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Welcome' }} />
        <Stack.Screen name="ViewNotes" component={ViewNotes} options={{ title: 'View Notes' }} />
        <Stack.Screen name="ViewContacts" component={ViewContacts} options={{ title: 'View Contacts' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;





// import React, { useState } from 'react';
// import { StyleSheet, View, Pressable, Text, TextInput, ScrollView, Alert } from 'react-native';
// import axios from 'axios';

// const App = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [age, setAge] = useState('');
//     const [notesCreatedIDs, setNotesCreatedIDs] = useState('');
//     const [notesTaggedIDs, setNotesTaggedIDs] = useState('');
//     const [notesPrimaryTaggedIDs, setNotesPrimaryTaggedIDs] = useState('');
//     const apiUrl = "http://localhost:3000";

//     const addUser = async () => {
//         if (!firstName || !lastName || !age) {
//             Alert.alert('Error', 'Please fill in all fields');
//             return;
//         }
//         try {
//             const payload = {
//                 FirstName: firstName,
//                 LastName: lastName,
//                 Age: parseInt(age, 10),
//                 NotesCreatedIDs: notesCreatedIDs,
//                 NotesTaggedIDs: notesTaggedIDs,
//                 NotesPrimaryTaggedIDs: notesPrimaryTaggedIDs
//             };
//             const response = await axios.post(`${apiUrl}/add-user`, payload);
//             Alert.alert('Success', response.data.message);
//         } catch (error) {
//             console.error('Error adding user:', error);
//             Alert.alert('Error', 'Failed to add user');
//         }
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
//             <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
//             <TextInput style={styles.input} placeholder="Age" onChangeText={setAge} value={age} keyboardType="numeric" />
//             <TextInput style={styles.input} placeholder="Notes Created IDs" onChangeText={setNotesCreatedIDs} value={notesCreatedIDs} />
//             <TextInput style={styles.input} placeholder="Notes Tagged IDs" onChangeText={setNotesTaggedIDs} value={notesTaggedIDs} />
//             <TextInput style={styles.input} placeholder="Primary Notes Tagged IDs" onChangeText={setNotesPrimaryTaggedIDs} value={notesPrimaryTaggedIDs} />
//             <Pressable style={styles.button} onPress={addUser}>
//                 <Text style={styles.buttonText}>Add User</Text>
//             </Pressable>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
//     button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 4,
//         backgroundColor: 'blue',
//     },
//     buttonText: {
//         color: 'white',
//     }
// });

// export default App;
