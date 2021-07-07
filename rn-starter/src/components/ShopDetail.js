import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//<Image src={shop.main_image} width="100" height="100"/>
const ShopDetail = ({shop}) => {
    return (
      <View style={styles.background}>
        
        <Text style={styles.titlestyle}>{shop.name}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  titlestyle: {
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    flex: 1,
    fontWeight: "bold"

  },
  descriptionstyle: {
    fontSize: 15,
    left: 110,
    position: 'absolute',
    top:55
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
}

});
  
export default ShopDetail;