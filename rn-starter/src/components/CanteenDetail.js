import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//<img src={canteen.main_image} width="100" height="100"/>
const MenuDetail = ({canteen}) => {

  return (
    <View style={styles.background}>
      
      <Text style={styles.titlestyle}>{canteen.name}</Text>
      <Text style={styles.locationstyle}>ตึกพระเทพ</Text>
    </View>
  )
}
//{canteen.location}
const styles = StyleSheet.create({
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
}

  });
  
  export default MenuDetail;