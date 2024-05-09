import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNote from './AddNote';
import ViewNotes from './ViewNotes';
import AddContact from './AddContact';
import ViewContacts from './ViewContacts';
import LandingPage from './LandingPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Welcome' }} />
        <Stack.Screen name="ViewNotes" component={ViewNotes} options={{ title: 'View Notes' }} />
        <Stack.Screen name="AddNote" component={AddNote} options={{ title: 'Add Note' }} />
        <Stack.Screen name="ViewContacts" component={ViewContacts} options={{ title: 'View Contacts' }} />
        <Stack.Screen name="AddContact" component={AddContact} options={{ title: 'Add Contact' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
