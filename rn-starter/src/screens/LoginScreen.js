/*
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from "react";
import {PrimaryButton} from '../components/Button';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleResponse = res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error('Network response was not ok.')
  }

  const apicall = () => {

    const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/dj-rest-auth/login/';

    fetch(apiUrl, {
      //mode: 'no-cors', 
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
    
    navigation.navigate('Canteen')
  }

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Near me</Text >

      <View style={[styles.background]}>
        <Text style={styles.iconstyle}>Username</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}/>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
        <Text style={styles.asktext}>Don't have an account? sign in with us here!</Text>
      </TouchableOpacity>

      <View style={styles.background}>
        <Text style={styles.iconstyle}>Password</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}/>
      </View>

      <TouchableOpacity>
        <Text style={styles.asktext}>Forgot password</Text>
      </TouchableOpacity>

      <PrimaryButton
        onPress={() => {
          if (password.trim() === "" || username.trim() === "") {
          } 
          else {
            //{navigation.navigate('Canteen');};
            {apicall()};
          }
        }}
        title="Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 20,
    alignSelf: 'center'
  },
  input: {
      margin: 15,
      borderColor: 'black',
      borderWidth: 1
  },
  bg: {
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  asktext: {
    fontSize: 10,
    color: 'orange',
    paddingBottom: 20,
    paddingLeft: 20
  },
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
    marginHorizontal: 10,
    fontWeight: 'bold'
  }
});

export default LoginScreen;
*/


import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import STYLES from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {PrimaryButton} from '../components/Button';
import { useState } from "react";

const LoginScreen = ({navigation}) => {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleResponse = res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error('Network response was not ok.')
  }

  const apicall = () => {

    const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/dj-rest-auth/login/';

    fetch(apiUrl, {
      //mode: 'no-cors', 
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
    
    navigation.navigate('Canteen')
  }

  
  return (
    <SafeAreaView
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
                  {apicall()};
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
    </SafeAreaView>
  );
};

export default LoginScreen;



