import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Hi there!</Text>
      <Button
        onPress={() => navigation.navigate('Components')}
        title="Go to Components Demo"
      />
      <Button
        onPress={() => navigation.navigate('List')}
        title="Go to List Demo"
      />
      <Button
        onPress={() => navigation.navigate('Menu')}
        title="Go to Menu"
      />
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Go to Menu"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
