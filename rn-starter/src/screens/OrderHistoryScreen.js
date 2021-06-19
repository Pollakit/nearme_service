import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from "react";
import COLORS from '../consts/colors';
import {PrimaryButton} from '../components/Button';
import {MiniButton} from '../components/Button';
import {SecondaryButton} from '../components/Button';
import orderHistory from '../consts/orderHistory';

const OrderHistoryScreen = ({navigation}) => {

  const apiUrl = window.apiurl + 'api/orders/orders/customer/1/';

  const [Order, setOrder] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setOrder(data);
      console.log(data);
  }

  const OrderCard = ({item}) => {

    const Time = item.created_at
    const Date = Time.split('T');
    const hour = Date[1].split(':');
    console.log(Date[0],hour[0] + ':' + hour[1])


    const [Shop, setShop] = useState([]);

    useEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
        const response = await fetch(window.apiurl + 'api/shops/shops/'+ item.shop + '/');
        const data = await response.json();
        setShop(data);
        console.log(data);
    }

    return (
      <View style={style.cartCard}>
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>สั่งเมื่อ<Text>{' '}</Text>{hour[0] + ':' + hour[1]}<Text>{' '}</Text>นาฬิกา</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>วันที่<Text>{' '}</Text>{Date[0]}<Text>{' '}</Text></Text>
          <Text style={{fontSize: 13, color: COLORS.primary}}>
            ร้าน<Text>{' '}</Text>{Shop.name}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>ราคารวม<Text>{' '}</Text>{item.totalPrice}<Text>{' '}</Text>บาท</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{marginBottom:10, marginTop: 5, fontWeight: 'bold', fontSize: 16, color: COLORS.maroon}}>{item.state}</Text>
          <MiniButton title="  ดูรายละเอียด  " onPress={() => {navigation.navigate('Order', {orderid: item.id, shopname: Shop.name, locid: item.deliveryLocation, date: Date, time: hour})}}/>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={{paddingBottom: 200}}
        data={Order}
        renderItem={({item}) => <OrderCard item={item} />}
      />
    </View>
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

export default OrderHistoryScreen;
