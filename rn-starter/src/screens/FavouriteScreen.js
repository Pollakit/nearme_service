import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import favorite from '../consts/favorite';

const {width} = Dimensions.get('screen');   //get size of current screen to calculate card width 
const cardWidth = width - 20;               //card width constant when we have 2 cards per row

//const TestAPI = 'http://cold-squid-62.loca.lt/media/images/shopOwner/kekw.jpg';
//const TestAPI2 = 'http://cold-squid-62.loca.lt/';
//const TestAPI3 = 'media/images/shopOwner/kekw.jpg';


const FavoriteScreen = ({navigation}) => {
  const Card = ({favorite}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Menu')}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end', top: 20, left:-20 }}>
            <Image source={favorite.image} style={{height: 120, width: 120, borderRadius: 15}} />
          </View>
          <View style={{marginHorizontal: 20, marginVertical: -80}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{favorite.name}</Text>
            <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
              {favorite.category}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={style.addToFavoriteBtn}>
                  <Icon name="star" size={20} color={COLORS.white} />
              </View>
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
        data={favorite}
        renderItem={({item}) => <Card favorite={item} />}
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





