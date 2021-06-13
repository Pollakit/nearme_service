import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, View, Dimensions,TouchableHighlight, TextInput} from 'react-native';
import { useState, useEffect } from "react";
//import TabNavigator from '../navigations/BottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';



const {width} = Dimensions.get('screen');   //get size of current screen to calculate card width 
const cardWidth = width - 20;               //card width constant when we have 2 cards per row


const CanteenScreen = ({navigation}) => {

  const apiUrl = window.apiurl + 'api/markets/markets/marketchain/1/';

  const [Canteens, setCanteens] = useState([]);
  const [Search, setSearch] = useState([]);

  useEffect(() => {
    loadData();
  }, [Search]);

  const loadData = async () => {
    if (Search.length == 0) {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCanteens(data);
      console.log(data);
    } else {
      const response = await fetch(window.apiurl + 'api/markets/markets/search/?search=' + Search);
      const data = await response.json();
      setCanteens(data);
      console.log(data);
    }
  }

  const MenuDetail = ({canteen}) => {
    return (
      <TouchableHighlight
      underlayColor={COLORS.white}
      activeOpacity={0.9}
      onPress={() => {navigation.navigate('Shop', {canteenid: canteen.id, canteenname: canteen.name})}}>
      <View style={style.card}>
        <View style={{alignItems: 'flex-end', top: 20, left:-20 }}>
          <img src={canteen.main_image} style={{height: 100, width: 120, borderRadius: 15}} />
        </View>
        <View style={{marginHorizontal: 20, marginVertical: -80}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{canteen.name}</Text>
          <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
            ตึกพระเทพ
          </Text>
        </View>
      </View>
    </TouchableHighlight>
    )
  }


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
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>กรุณาเลือกโรงอาหารภายใน</Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.primary}}>
            มหาวิทยาลัยพระจอมเกล้าลาดกระบัง
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
        data={Canteens}
        renderItem={({item}) => <MenuDetail canteen={item} />}
      />
      
    </View>
  );
};

const style = StyleSheet.create({
  Header: {
    fontSize: 25,
    fontWeight: 'bold',
    left: 15,
    top: 10,
    paddingBottom: 15
  },
  top: {
    flexDirection: 'row'
  },
  bg: {
    backgroundColor: 'white'
  },
  titlestyle: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
    flex: 1,
    fontWeight: "bold"

  },
  locationstyle: {
    fontSize: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingRight: 10

  },
  image: {
    width: 100,
    height: 100
  },
  background: {
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    marginHorizontal: 15,
    height: 100,
    margin: 10,
    flexDirection: 'row',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    height: 140,
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
  },
});

export default CanteenScreen;