import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {Feather} from '@expo/vector-icons';

const Searchbox = () => {
  return (
    <View style={styles.background}>
        <Feather style={styles.iconstyle} name='search'/>
        <TextInput style={styles.inputstyle} placeholder = 'Search for your restaurant'/>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
      backgroundColor: '#F0EEEE',
      borderRadius: 10,
      marginHorizontal: 15,
      height: 50,
      flexDirection: 'row',
      marginTop: 10
  },
  inputstyle: {
      flex: 1,
      fontSize: 14
  },
  iconstyle:{
      fontSize: 30,
      alignSelf: 'center',
      marginHorizontal: 10
  }
});

export default Searchbox;