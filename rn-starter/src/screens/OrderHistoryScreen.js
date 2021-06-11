import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {PrimaryButton} from '../components/Button';
import {MiniButton} from '../components/Button';
import {SecondaryButton} from '../components/Button';
import orderHistory from '../consts/orderHistory';

const OrderHistoryScreen = ({navigation}) => {

  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>สั่งเมื่อ<Text>{' '}</Text>{item.time}<Text>{' '}</Text>นาฬิกา</Text>
          <Text style={{fontSize: 13, color: COLORS.primary}}>
            ร้าน<Text>{' '}</Text>{item.from}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>ราคารวม<Text>{' '}</Text>{item.totalprice}<Text>{' '}</Text>บาท</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{marginBottom:10, marginTop: 5, fontWeight: 'bold', fontSize: 16, color: COLORS.maroon}}>{item.status}</Text>
          <MiniButton title="  ดูรายละเอียด  " onPress={() => navigation.navigate('Order')}/>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={{paddingBottom: 200}}
        data={orderHistory}
        renderItem={({item}) => <CartCard item={item} />}
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
