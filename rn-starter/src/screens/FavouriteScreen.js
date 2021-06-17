import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { useState, useEffect } from "react";

const {width} = Dimensions.get('screen');   //get size of current screen to calculate card width 
const cardWidth = width - 20;               //card width constant when we have 2 cards per row

const FavoriteScreen = ({navigation}) => {

  const [Favshops, setFavshops] = useState([]);
  const [dummy, reload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    FavShopsloadData();
    setRefreshing(false)
  }, [refreshing]);

  useEffect(() => {
    setTimeout(()=>{
      FavShopsloadData();
     }, 1000)
  }, [dummy]);

 const FavShopsloadData = async () => {
    const response = await fetch(window.apiurl + 'api/shops/favouriteShop/customer/1/');
    const data = await response.json();
    setFavshops(data);
    console.log(data);
  }

  const deletefav = (favid) => {
    const apiUrl = window.apiurl + 'api/shops/favouriteShop/' + favid + '/';
    fetch(apiUrl, { 
      method: 'delete'
    }).then(res => res.text()) // or res.json()
    .then(res => console.log(res))
  }

  const Card = ({favorite}) => {

    const [Shops, setShops] = useState([]);

    useEffect(() => {
      ShopsloadData();
    }, []);
  
   const ShopsloadData = async () => {
      const response = await fetch(window.apiurl + 'api/shops/shops/' + favorite.shop + '/');
      const data = await response.json();
      setShops(data);
      console.log(data);
    }

    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(('Menu'), {shopid: Shops.id, shopname: Shops.name})}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end', top: 20, left:-20 }}>
            <Image source={{uri:Shops.main_image}} style={{height: 120, width: 120, borderRadius: 15}} />
          </View>
          <View style={{marginHorizontal: 20, marginVertical: -80}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{Shops.name}</Text>
            <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
              {Shops.desc}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={style.addToFavoriteBtn} 
                  onPress={() => [deletefav(favorite.id), reload(!dummy)]}>
                  <Icon name="star" size={20} color={COLORS.white} />
              </TouchableHighlight >
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
        <View style={{flexDirection: 'row', marginTop: 20, }}>
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
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>รายชื่อร้านโปรดภายใน</Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.primary}}>
            มหาวิทยาลัยพระจอมเกล้าลาดกระบัง
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={Favshops}
        renderItem={({item}) => <Card favorite={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    backgroundColor: COLORS.light,
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
  },// Margin left is added later
});

export default FavoriteScreen;





