import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {Feather} from '@expo/vector-icons';

const InputBox = ({title}) => {
  return (
    <View style={styles.background}>
        <Text style={styles.iconstyle}>{title}</Text>
        <TextInput style={styles.inputstyle}/>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
      backgroundColor: '#F0EEEE',
      borderRadius: 10,
      marginHorizontal: 15,
      height: 50,
      flexDirection: 'column',
      marginTop: 10
  },
  inputstyle: {
      fontSize: 14,
      paddingLeft: 20
  },
  iconstyle:{
      fontSize: 14,
      marginHorizontal: 10
  }
});

export default InputBox;