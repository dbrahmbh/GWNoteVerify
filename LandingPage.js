import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="View Notes"
          onPress={() => navigation.navigate('ViewNotes')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Users"
          onPress={() => navigation.navigate('ViewContacts')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20  // Adds padding around the entire container
  },
  buttonContainer: {
    marginBottom: 20,  // Adds vertical space between the buttons
    width: '80%',     // Sets the width of the buttons to 80% of their container's width
    alignSelf: 'center'  // Ensures buttons are centered in their container
  }
});

export default LandingPage;
