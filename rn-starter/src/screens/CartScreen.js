import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, TouchableHighlight, TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {PrimaryButton} from '../components/Button';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage'



const CartScreen = ({navigation}) => {

  const [Products, setProducts] = useState([]);
  

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('shopid');
      const value2 = await AsyncStorage.getItem('products');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setProducts(JSON.parse(value2));
        console.log(JSON.parse(value2));
      }
    } catch (error) {
      
    }
  };
  
  const CartCard = ({item}) => {

    const [Quantity, setQuantity] = useState(1);

    const increment = () => {
      var newQuantity = Quantity + 1
      setQuantity(newQuantity)
    }

    const decrement = () => {
      if (Quantity > 1) {
        var newQuantity = Quantity - 1
        setQuantity(newQuantity)
      } else {
        
      }
    }

    return (
      <View style={style.cartCard}>
        <Image source={{uri:item.image}} style={{height: 80, width: 80, borderRadius: 15}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item.price}บาท</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>จำนวน {Quantity}</Text>
          <View style={style.actionBtn}>
            <TouchableHighlight style={style.addToFavoriteBtn} 
            onPress={() => decrement()}>
            <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableHighlight>
            <TouchableHighlight style={style.addToFavoriteBtn} 
            onPress={() => increment()}>
            <Icon name="add" size={25} color={COLORS.white} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={Products}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ราคาทั้งหมด
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{Products.reduce((accumulator, current) => accumulator + current.price, 0)} บาท</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
                marginBottom: 30,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                จัดส่งที่
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>"suppose to be address of customer"</Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                โน๊ตถึงร้านค้า
            </Text>
            <TextInput
              style={{ height: 100, backgroundColor: '#E5E5E5', borderWidth: 1, placeholderTextColor: 'gray', }}
              multiline={true}
              numberOfLines={4}
	            placeholder="Insert your text!"
              />
            <View style={{marginHorizontal: 30, marginTop: 20}}>
              <PrimaryButton title="ยืนยันการสั่งซื้อ" onPress={() => retrieveData()}/>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;

