import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {SecondaryButton} from '../components/Button';
import { useState, useEffect } from "react";



const OrderDetailsScreen = ({navigation}) => {

  const apiUrl = window.apiurl + 'api/orders/orders/'+ navigation.getParam('orderid') + '/';

  const [Orderdetail, setOrderdetail] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [LocationDetail, setLocationDetail] = useState([]);

  useEffect(() => {
    loadData();
    loadLoc();
  }, []);


  const loadData = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setOrderdetail(data);
      console.log(data);
      setProductID(data.products);
      console.log(data.products);
  }

  const loadLoc = async () => {
    const response = await fetch(window.apiurl + 'api/markets/deliverylocations/' + navigation.getParam('locid') + '/');
    const data = await response.json();
    setLocationDetail(data);
    console.log(data);
}

const ProductCard = ({item}) => {

  const [Product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const response = await fetch(window.apiurl + 'api/shops/products/'+ item.product + '/');
      const data = await response.json();
      setProduct(data);
      console.log(data);
  }

  return (
    <View>
          <Text style={style.detailsText}>
            {Product.name}:<Text>{' '}</Text>{item.quantity} กล่อง
          </Text>
    </View>
  );
};


  if (Orderdetail.len == 0 && LocationDetail.len == 0) {
    return null
  }
  
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 10,
          }}>
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white, marginBottom: 5}}>
              รายละเอียดการสั่ง
            </Text>
          </View>
          <Text style={style.detailsText}>
            ชื่อร้าน:<Text>{' '}</Text>{navigation.getParam('shopname')}
          </Text>
          <Text style={style.detailsText}>
            เบอร์โทรศัพท์ร้าน:<Text>{' '}</Text>{Orderdetail.deliverPhone}
          </Text>
          <Text style={style.detailsText}>
            สถานที่จัดส่ง:<Text>{' '}</Text>{LocationDetail.name}
          </Text>
          <Text style={style.detailsText}>
            สั่งเมื่อ:<Text>{' '}</Text> วันที่ {navigation.getParam('date')[0]}, {navigation.getParam('time')[0]} : {navigation.getParam('time')[1]} นาฬิกา
          </Text>
          <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white, marginTop:20}}>
              รายการที่สั่ง
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            //contentContainerStyle={{paddingBottom: 200}}
            data={ProductID}
            renderItem={({item}) => <ProductCard item={item} />}
          />
          <Text style={style.detailsText}>
            ราคารวม:<Text>{' '}</Text>{Orderdetail.totalPrice} บาท
          </Text>
          <View style={{flexDirection: 'row', marginTop: 100, marginBottom: 300, marginLeft: 100}}>
            <SecondaryButton title="  ยืนยันการรับสินค้า  " onPress={() => navigation.navigate('List')}/>
            </View>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 20,
    color: COLORS.white,
  },
});

export default OrderDetailsScreen;
