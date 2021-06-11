import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableHighlight,
  TouchableOpacity,} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import foods from '../consts/foods';
import {PrimaryButton} from '../components/Button';
import {DeleteButton} from '../components/Button';
import {MiniButton} from '../components/Button';

const {width} = Dimensions.get('screen');   //get size of current screen to calculate card width 
const cardWidth = width - 20;               //card width constant when we have 2 cards per row

const MenuScreen = ({navigation}) => {

  const Card = ({menus}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Cart')}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end', top: 20, left:-20 }}>
            <Image source={menus.image} style={{height: 120, width: 120, borderRadius: 15}} />
          </View>
          <View style={{marginHorizontal: 20, marginVertical: -80}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{menus.name}</Text>
            <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
              {menus.decorator}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ราคา :<Text>{' '}</Text>
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.primary}}>
                {menus.price}
              </Text>
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
            <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.primary, marginBottom: 20}}>
              Me
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark, marginBottom: 20, marginLeft: 290}}>
            </Text>
          </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>กรุณาเลือกรายการอาหารภายใน</Text>
            </View>
            <Text style={{marginTop: 5, fontSize: 22, color: COLORS.primary}}>
              ร้านป้าตามสั่ง โรงพระเทพ
            </Text>
        </View>  
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={foods}
        renderItem={({item}) => <Card menus={item} />}
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
  cartBtn: {
    width: 140,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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

export default MenuScreen;
