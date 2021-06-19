import React from 'react';
import {Alert,SafeAreaView, StyleSheet, View, Text, Image, TouchableHighlight, TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {PrimaryButton} from '../components/Button';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage'



const CartScreen = ({navigation}) => {

  const [Products, setProducts] = useState([]);
  const [Shopid, setShopid] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const SuccessAlertHandler = () => {
    //function to make simple alert
    Alert.alert(
      'Order complete',
      'Thankyou for using our service, please wait for your meal', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => navigation.navigate('Canteen')},
      ],
      {cancelable: false},
    );
  };

  const handleQuantityIncrease = (index) => {
    const newProducts = [...Products];

    newProducts[index].quantity++;

    setProducts(newProducts);
    calculateTotal();
};

const handleQuantityDecrease = (index) => {
  const newProducts = [...Products];

  newProducts[index].quantity--;

  setProducts(newProducts);
  calculateTotal();
};

const calculateTotal = () => {
  const totalItemCount = Products.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  setTotalItemCount(totalItemCount);
};

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
      const value = await AsyncStorage.getItem('shopid');
      const value2 = await AsyncStorage.getItem('products');
      console.log(value);
      setProducts(JSON.parse(value2));
      setShopid(JSON.parse(value))
  };

  const apicall = async() => {
    
    const value = await AsyncStorage.getItem('cusid');
    // We have data!!
    console.log(value)
    console.log(Shopid)
    
    const apiUrl = 'https://nearme-kmitl.herokuapp.com/api/orders/orders/';

    const response = await fetch(apiUrl, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          shop: Shopid,
          customer: JSON.parse(value),
          totalPrice: Number(totalItemCount),
          deliveryLocation: 1,
          deliveryNote: 'floor1'
        }
      )
    })

    const data = await response.json();
    console.log(data)
    if (response.ok) {
      orpro(data.id)
      //AsyncStorage.setItem('cusid', JSON.stringify((data.id)))
      //navigation.navigate('Canteen')
    } else {
      
    }
  }

  const orpro = async (orderid) => {

      console.log('inorpro')

      Products.map((items)=>{
        console.log(orderid)
        console.log(items)
        const response = fetch(window.apiurl + 'api/orders/products/', { 
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              order: orderid,
              product: items.product,
              pricePerUnit: items.price,
              quantity: items.quantity,
              decorators: []
            }
          )
        });
    }
  )
  SuccessAlertHandler()
}
  
  const CartCard = ({item, index}) => {

    if(totalItemCount == 0){
    const initialval = Products.reduce((accumulator, current) => accumulator + current.price, 0)
    setTotalItemCount(initialval)
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
          <Text style={{fontWeight: 'bold', fontSize: 16}}>จำนวน {item.quantity}</Text>
          <View style={style.actionBtn}>
            <TouchableHighlight style={style.addToFavoriteBtn} 
            onPress={() => {if (item.quantity > 1) {
              handleQuantityDecrease(index)
            } else {
              
            }}}>
            <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableHighlight>
            <TouchableHighlight style={style.addToFavoriteBtn} 
            onPress={() => handleQuantityIncrease(index)}>
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
        renderItem={({item, index}) => <CartCard item={item} index={index} />}
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{totalItemCount} บาท</Text>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>ECC building</Text>
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
              <PrimaryButton title="ยืนยันการสั่งซื้อ" onPress={() => {apicall()}}/>
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
    backgroundColor: COLORS.white,
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

