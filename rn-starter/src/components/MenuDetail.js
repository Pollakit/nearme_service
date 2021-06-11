import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MenuDetail = ({menu}) => {
    return (
      <View style={styles.background}>
        <Image style={styles.image} source={menu.menuimg}/>
        <Text style={styles.titlestyle}>{menu.name}</Text>
        <Text style={styles.pricestyle}>{menu.price} baht</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  titlestyle: {
    fontSize: 25,
    top: 0,
    right: 0,
    position: 'absolute',
    paddingRight: 10,
    paddingTop: 10,
    fontWeight: 'bold'
  },
  pricestyle: {
    fontSize: 20,
    textAlign: 'right',
    bottom: 0,
    right: 0,
    position: 'absolute',
    paddingRight: 10,
    paddingBottom: 10
  },
  image: {
    width: 100,
    height: 100,
},
background: {
  backgroundColor: '#EFEFEF',
  borderRadius: 5,
  marginHorizontal: 15,
  height: 100,
  margin: 10,
  flexDirection: 'row',
}

  });
  
  export default MenuDetail;