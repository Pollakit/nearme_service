import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import STYLES from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {PrimaryButton} from '../components/Button';
import { useState } from "react";
import AsyncStorage from '@react-native-community/async-storage'

const LoginScreen = ({navigation}) => {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleResponse = res => {
    if(res.ok) {
      navigation.navigate('Canteen')
    }
    throw new Error('Network response was not ok.')
  }

  const apicall = (username, password) => {

    const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/dj-rest-auth/login/';

    fetch(apiUrl, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          username: username,
          password: password,
        }
      )
    }).then(handleResponse)
    .then(data => console.log(data))
    .catch(error => console.log("Error detected: " + error)) 
  }

  
  return (
    <View
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40, }}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            Near
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.primary}}>
            Me
          </Text>
        </View>

        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            ยินดีต้อนรับ
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.dark}}>
            กรุณายืนยันตัวตน เพื่อเข้าสู่ระบบ
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="email"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="ชื่อบัญชี" style={STYLES.input} 
             onChangeText={(username) => setUsername(username)}/>
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="รหัสผ่าน"
              style={STYLES.input}
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          
          <View style={{marginHorizontal: 30 , marginVertical:50}}>
          <TouchableOpacity>
              <PrimaryButton 
                onPress={() => {
                  if (password.trim() === "" || username.trim() === "") {
                  } 
                  else {
                    //{navigation.navigate('Canteen');};
                    {apicall(username, password)};
                  }
                }}
                title="เข้าสู่ระบบ"/>
          </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
            ยังไม่เคยสมัครบัญชี?<Text>{' '}</Text>
          </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Sign');}}>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              สมัครเลย!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;



