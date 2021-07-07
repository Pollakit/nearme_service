import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from "react";
import InputBox from '../components/InputBox';
import {PrimaryButton} from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import STYLES from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';



const ProfileScreen = ({ navigation }) => {

  const [fname, setFname] = useState(navigation.getParam('fname'));
  const [lname, setLname] = useState(navigation.getParam('lname'));
  const [username, setUsername] = useState(navigation.getParam('username'));
  const [phone, setPhone] = useState(navigation.getParam('phone'));


  const apicall = async() => {

    const value = await AsyncStorage.getItem('cusid');
    // We have data!!
    console.log(value);

    const response = await fetch('https://nearme-kmitl.herokuapp.com/api/accounts/customers/1/' + JSON.parse(value) + '/', { 
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(
        {user:
        {
          username: username,
          phone: phone,
          first_name: fname,
          last_name: lname,
          type: 'CUSTOMER'
        }
        }
      )
    })

    const data = await response.json();
    console.log(data)
    if (response.ok) {
      navigation.navigate('Profile')
    } else {
      
    }
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

        <View style={{marginTop: 40}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            ตั้งค่าบัญชีผู้ใช้
          </Text>
        </View>
        
        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
               <TextInput style={STYLES.input}
                  defaultValue= {navigation.getParam('username')}
                  placeholderTextColor="#003f5c"
                  onChangeText={(username) => setUsername(username)}/>
          </View>

          <View style={STYLES.inputContainer}>
              <TextInput style={STYLES.input}
                  defaultValue= {navigation.getParam('fname')}
                  placeholderTextColor="#003f5c"
                  onChangeText={(fname) => setFname(fname)}/>
          </View>

          <View style={STYLES.inputContainer}>
              <TextInput style={STYLES.input}
                  defaultValue= {navigation.getParam('lname')}
                  placeholderTextColor="#003f5c"
                  onChangeText={(lname) => setLname(lname)}/>
          </View>

          <View style={STYLES.inputContainer}>
              <TextInput style={STYLES.input}
                  defaultValue= {navigation.getParam('phone')}
                  placeholderTextColor="#003f5c"
                  onChangeText={(phone) => setPhone(phone)}/>
          </View>
          
          <View style={{marginHorizontal: 30 , marginVertical:50}}>
          <TouchableOpacity>
              <PrimaryButton title="บันทึกการเปลี่ยนแปลง" onPress={() => {
                  if (fname.trim() === "" || lname.trim() === ""|| username.trim() === "" || phone.trim() === "") {
                  } 
                  else {
                    //{navigation.navigate('Canteen');};
                    {apicall()};
                  }
                }}/>
          </TouchableOpacity>

          <View style={{marginBottom:20}}></View>

          <TouchableOpacity>
              <PrimaryButton title="ยกเลิกการเปลี่ยนแปลง"
              onPress={() => navigation.navigate('Profile')}/>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
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
});

export default ProfileScreen;

/* PUT                                                                              #update EFG as a name to customer
componentDidMount() {
    const apiUrl = 'https://blue-bulldog-33.loca.lt/api/accounts/customers/'int'';
    fetch(apiUrl, {
      //mode: 'no-cors', 
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
        id:"8",
        user:{
          username: "EFG",
          email: "1234@gmail.com",
          first_name: "ABCD",
          last_name: "1234",
          password: "ABCD",
          phone: "0935467785",
          type: "CUSTOMER"
        }
      }
      )
    }).then(response => response.text())
    .then(data => console.log(data))    
    .catch(error => console.log("Error detected: " + error))                                
  }

  render() {
    return <h1>Sent mock data to server</h1>;
  }

}
*/

/* POST                                                                              ##create user ABCD to server
componentDidMount() {
    const apiUrl = 'https://blue-bulldog-33.loca.lt/api/accounts/customers/;
    fetch(apiUrl, {
      //mode: 'no-cors', 
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
        user:{
          username: "ABCD",
          email: "1234@gmail.com",
          first_name: "ABCD",
          last_name: "1234",
          password: "ABCD",
          phone: "0935467785",
          type: "CUSTOMER"
        }
      }
      )
    }).then(response => response.text())
    .then(data => console.log(data))    
    .catch(error => console.log("Error detected: " + error))                                
  }

  render() {
    return <h1>Sent mock data to server</h1>;
  }

}
*/