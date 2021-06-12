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

  const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/accounts/customers/1/';

  const [Customer, setCustomer] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  setCustomer(data.user);
  console.log(data);
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
            บัญชีผู้ใช้
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
              <Text style={STYLES.input}>ชื่อบัญชี: {Customer.username}</Text> 
          </View>
          <View style={STYLES.inputContainer}>
              <Text style={STYLES.input}>ชื่อจริง: {Customer.first_name}</Text> 
          </View>
          <View style={STYLES.inputContainer}>
              <Text style={STYLES.input}>นามสกุล: {Customer.last_name}</Text> 
          </View>
          <View style={STYLES.inputContainer}>
              <Text style={STYLES.input}>อีเมล:  {Customer.email}</Text>
          </View>
          <View style={STYLES.inputContainer}>
              <Text style={STYLES.input}>เบอร์โทรศัพท์:  {Customer.phone}</Text>
          </View>
          
          <View style={{marginHorizontal: 30 , marginVertical:50}}>
          <TouchableOpacity>
              <PrimaryButton title="แก้ไขข้อมูล" onPress={() => {navigation.navigate('Edit', {username: Customer.username, email: Customer.email, phone: Customer.phone, fname: Customer.first_name, lname: Customer.last_name})}}/>
          </TouchableOpacity>

          <View style={{marginBottom:20}}></View>

          <TouchableOpacity>
              <PrimaryButton title="ออกจากระบบ"
              onPress={() => navigation.navigate('OnBoard')}/>
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
});

export default ProfileScreen;



/*
import React from 'react';

class ProfileScreen extends React.Component {

  render() {
    console.log(this.state.contacts.user)
    return <h1>Hello</h1>
  }
  
  state = {
    contacts: []
  };
  
  componentDidMount() {
    const apiUrl = window.apiurl + 'api/accounts/customers/3' ;
    fetch(apiUrl, {mode: 'no-cors'})
      .then((response) => response.json())
      //.then((data) => console.log('This is your data', data))
      .then((data) => {
        this.setState({ contacts: data })
      })
      .then(console.log('hithere'))                                                                                                               
  }
}
export default ProfileScreen;
*/
