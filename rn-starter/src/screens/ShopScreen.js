import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, View, Dimensions,TouchableHighlight, TextInput, RefreshControl } from 'react-native';
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import AsyncStorage from '@react-native-community/async-storage'


const {width} = Dimensions.get('screen');   //get size of current screen to calculate card width 
const cardWidth = width - 20;               //card width constant when we have 2 cards per row



const ShopScreen = ({navigation}) => {

  //const { canteenid } = route.params;

  const [Shops, setShops] = useState([]);
  const [Search, setSearch] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    ShopsloadData();
    setRefreshing(false)
  }, [refreshing]);


  useEffect(() => {
    ShopsloadData();
  }, [Search]);

 const ShopsloadData = async () => {
   if (Search.length == 0) {
    const response = await fetch(window.apiurl + 'api/shops/shops/market/' + navigation.getParam('canteenid') + '/');
    const data = await response.json();
    setShops(data);
    console.log(data);
   } else {
    const response = await fetch(window.apiurl + 'api/shops/shops/market/' + navigation.getParam('canteenid') + '/search/?search=' + Search);
    const data = await response.json();
    setShops(data);
    console.log(data);
   }
  }

  const handleResponse = res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error('Network response was not ok.')
  }

  const apicall = async (userid, storeid) => {

    const value = await AsyncStorage.getItem('cusid');
    // We have data!!
    console.log(value)

    const apiUrl = window.apiurl + 'api/shops/favouriteShop/';
    fetch(apiUrl, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          customer: JSON.parse(value),
          shop: storeid,
        }
      )
    }).then(handleResponse)
    .then(data => console.log(data))
    .catch(error => console.log("Error detected: " + error)) 
  }




  const Card = ({stores}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => {navigation.navigate(('Menu'), {shopid: stores.id, shopname: stores.name}), AsyncStorage.setItem('shopid', JSON.stringify(stores.id))}}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end', top: 20, left:-20 }}>
            <Image source={{uri:stores.main_image}} style={{height: 120, width: 120, borderRadius: 15}} />
          </View>
          <View style={{marginHorizontal: 20, marginVertical: -80}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stores.name}</Text>
            <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
              {stores.categories[0].name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={style.addToFavoriteBtn} 
                  onPress={() => {apicall(1, stores.id)}}>
                  <Icon name="star" size={20} color={COLORS.white} />
              </TouchableHighlight >
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

/*
  const shops = [
    { name: 'Shop1', shopimg: require('../../assets/menu/FriedRice.jpg'), description:'thai food', goto: 'Menu', canteenloc:'phrathep' },
    { name: 'Shop2', shopimg: require('../../assets/menu/FriedRice.jpg'), description:'international food', goto: 'Menu', canteenloc:'phrathep' },
    { name: 'Shop3', shopimg: require('../../assets/menu/FriedRice.jpg'), description:'Noodle ', goto: 'Menu', canteenloc:'phrathep'}
  ];

    if (Shops.length == 0) {
    return (
    <View style={{backgroundColor: COLORS.white, position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'}}>
      <Text>ไม่พบร้านที่กำลังค้นหาใน{navigation.getParam('canteenname')}</Text>
    </View>
    );
  }
*/



  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
        <View style={{flexDirection: 'row', marginTop: 10, }}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            Near
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.primary, marginBottom: 20}}>
            Me
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark, marginBottom: 20, marginLeft: 290}}>
          </Text>
        </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>กรุณาเลือกร้านอาหารภายใน</Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.primary}}>
            {navigation.getParam('canteenname')}
          </Text>
          <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          paddingHorizontal: 0,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="ค้นหาร้านอาหาร"
            onChangeText={(Search) => setSearch(Search)}
          />
        </View>
      </View>
        </View>
        
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={Shops}
        renderItem={({item}) => <Card stores={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    height: 160,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToFavoriteBtn: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 125,
    marginTop: 20,
  },
});

export default ShopScreen;