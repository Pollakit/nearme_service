import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import COLORS from '../consts/colors';

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...style.btnContainer, backgroundColor: COLORS.white}}>
        <Text style={{...style.title, color: COLORS.primary}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MiniButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.minibtnContainer}>
        <Text style={style.minititle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DeleteButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.deletebtnContainer}>
        <Text style={style.minititle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minititle: {color: COLORS.white, fontWeight: 'bold', fontSize: 14},
  minibtnContainer:{
    backgroundColor: COLORS.primary,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletetitle: {color: COLORS.white, fontWeight: 'bold', fontSize: 14},
  deletebtnContainer:{
    backgroundColor: COLORS.red,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export {PrimaryButton, SecondaryButton, MiniButton, DeleteButton};
