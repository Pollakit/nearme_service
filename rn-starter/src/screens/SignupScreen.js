/*
import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput} from 'react-native';
import { useState } from "react";
import InputBox from '../components/InputBox';
import {PrimaryButton} from '../components/Button';
import Cookies from 'js-cookie';

const handleResponse = res => {
  if(res.ok) {
    return res.json()
  }
  throw new Error('Network response was not ok.')
}

const apicall = () => {

  const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/accounts/customers/';


  fetch(apiUrl, {
    //mode: 'no-cors', 
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        user: 12,
      }
    )
  }).then(handleResponse)
  .then(data => console.log(data.key)) 
  .catch(error => console.log("Error detected: " + error))
}

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    console.log("Hello");
  }, []);

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Near me</Text >

      <View style={[styles.background]}>
        <Text style={styles.iconstyle}>Email</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}/>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.asktext}>Have an account already, login here</Text>
      </TouchableOpacity>

      <View style={[styles.background]}>
        <Text style={styles.iconstyle}>First name</Text>
        <TextInput style={styles.inputstyle}
          placeholder="John"
          placeholderTextColor="#003f5c"
          onChangeText={(fname) => setFname(fname)}/>
      </View>

      <View style={[styles.background, {marginBottom:20} ]}>
        <Text style={styles.iconstyle}>Last name</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Doe"
          placeholderTextColor="#003f5c"
          onChangeText={(lname) => setLname(lname)}/>
      </View>

      <View style={[styles.background, {marginBottom:20} ]}>
        <Text style={styles.iconstyle}>Username</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}/>
      </View>

      <View style={[styles.background]}>
        <Text style={styles.iconstyle}>Password</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}/>
      </View>

      <View style={[styles.background, {marginBottom:20} ]}>
        <Text style={styles.iconstyle}>Confirm Password</Text>
        <TextInput style={styles.inputstyle}
          placeholder="Retype password."
          placeholderTextColor="#003f5c"
          onChangeText={(cpassword) => setCpassword(cpassword)}/>
      </View>

      <PrimaryButton
        onPress={() => navigation.navigate('Home')}
        title="Signup"
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

export default SignupScreen;
*/

import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import STYLES from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {PrimaryButton} from '../components/Button';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage'


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  
  const apicall = async() => {

    const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/dj-rest-auth/registration/';

    const response = await fetch(apiUrl, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          username: username,
          email: email,
          password1: password,
          password2: cpassword,
          phone: phone,
          first_name: fname,
          last_name: lname,
          type: 'CUSTOMER'
        }
      )
    })
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      console.log(data.user.pk)
      regcus(data.user.pk)
      //AsyncStorage.setItem('cusid', JSON.stringify((data.id)))
      //navigation.navigate('Canteen')
    } else {
      
    }
  }

  const regcus = async (userid) => {
    const response = await fetch(window.apiurl + 'api/accounts/customers/', { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          user: userid,
        }
      )
    })
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      AsyncStorage.setItem('cusid', JSON.stringify((data.id)))
      navigation.navigate('Canteen')
    } else {
      
    }
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

        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            ยินดีต้อนรับ
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.dark}}>
            สมัครบัญชี เพื่อเริ่มการใช้งาน
          </Text>
        </View>

        <View style={{marginTop: 20}}>
        <View style={STYLES.inputContainer}>
            <Icon
              name="person"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="ชื่อบัญชี"
              style={STYLES.input}
              onChangeText={(username) => setUsername(username)}
            />
        </View>
        <View style={STYLES.inputContainer}>
            <Icon
              name="person"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="ชื่อจริง"
              style={STYLES.input}
              onChangeText={(fname) => setFname(fname)}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="นามสกุล"
              style={STYLES.input}
              onChangeText={(lname) => setLname(lname)}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="email"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="อีเมล" style={STYLES.input} 
            onChangeText={(email) => setEmail(email)}/>
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="เบอร์โทรศัพท์"
              style={STYLES.input}
              onChangeText={(phone) => setPhone(phone)}
            />
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
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock"
              color={COLORS.dark}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="ยืนยันรหัสผ่าน"
              style={STYLES.input}
              secureTextEntry
              onChangeText={(cpassword) => setCpassword(cpassword)}
            />
          </View>
          
          <TouchableOpacity>
          <View style={{marginHorizontal: 30 , marginVertical:50}}>
              <PrimaryButton title="สมัครบัญชี" 
              onPress={() => apicall()}/>
            </View>
          </TouchableOpacity>
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
            marginTop: -65,
            marginBottom: 0,
          }}>
          <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
            มีบัญชีอยู่แล้ว?
          </Text>
          <TouchableOpacity>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}} onPress={() => navigation.navigate('Login')}>
              เข้าสู่ระบบเลย!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;