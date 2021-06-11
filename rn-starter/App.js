import { createStackNavigator} from 'react-navigation-stack';
import React from 'react';


import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import MenuScreen from './src/screens/MenuScreen';
import LoginScreen from './src/screens/LoginScreen';
import CanteenScreen from './src/screens/CanteenScreen';
import ShopScreen from './src/screens/ShopScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnBoardScreen from './src/screens/OnBoardScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import EditScreen from './src/screens/EditScreen';


import {StyleSheet, Text, View,Button} from 'react-native';  
import {createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

window.apiurl = "https://nearme-kmitl.herokuapp.com/"

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
      OnBoard : OnBoardScreen,
      Login: LoginScreen,
      Sign: SignupScreen,
      Edit:  EditScreen
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
    ),

    mainFlow: createStackNavigator({
      TabNav: createMaterialBottomTabNavigator(
      {
        Home: { screen: createStackNavigator({
          Canteen:  CanteenScreen,
          Shop: ShopScreen,
          },
          {
            headerMode: 'none',
            navigationOptions: {
              headerVisible: false,
            }
          }),  
          navigationOptions:{  
            tabBarLabel:'Shops',  
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
              </View>),  
          }  
        },

        Image: { screen: FavouriteScreen,  
          navigationOptions:{  
            tabBarLabel:'Favourite',  
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
              </View>),  
            activeColor: '#615af6',  
            inactiveColor: '#46f6d7',  
            barStyle: { backgroundColor: '#67baf6' },  
          }  
        },

        Cart: { screen: OrderHistoryScreen,  
          navigationOptions:{  
            tabBarLabel:'Cart',  
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
              </View>),  
          }  
        },

        Profile: { screen: ProfileScreen,  
          navigationOptions:{  
            tabBarLabel:'Profile',  
            tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
              </View>),  
            activeColor: '#f60c0d',  
            inactiveColor: '#f65a22',  
            barStyle: { backgroundColor: '#f69b31' },  
          }  
        },

      },
      
      {
        initialRouteName: "Home",  
        activeColor: '#f0edf6',  
        inactiveColor: '#226557',  
        barStyle: { backgroundColor: '#3BAD87' },
        navigationOptions: { headerShown:false }
      }),

      Menuflow: createSwitchNavigator({
        Menu:  MenuScreen,
        Cart: CartScreen
      }),
      
      Orderflow: createSwitchNavigator({
        Order:  OrderDetailsScreen
      }),

    }),
  },
  );
  

  /*
const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Sign: SignupScreen,
    Canteen: CanteenScreen,
    Menu: MenuScreen,
    Shop: ShopScreen

  },
  {
    initialRouteName: 'Canteen',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);
*/

/*
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: CanteenScreen,  
            navigationOptions:{  
                tabBarLabel:'Shops',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },   
        Image: { screen: FavouriteScreen,  
            navigationOptions:{  
                tabBarLabel:'Favourite',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
                    </View>),  
                activeColor: '#615af6',  
                inactiveColor: '#46f6d7',  
                barStyle: { backgroundColor: '#67baf6' },  
            }  
        },  
        Cart: {  
            screen: ListScreen,  
            navigationOptions:{  
                tabBarLabel:'Cart',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
                    </View>),  
            }  
        },
        Profile: { screen: ProfileScreen,  
          navigationOptions:{  
              tabBarLabel:'Profile',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                  </View>),  
              activeColor: '#f60c0d',  
              inactiveColor: '#f65a22',  
              barStyle: { backgroundColor: '#f69b31' },  
          }  
      },   
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
*/
  
const App = createAppContainer(switchNavigator);

export default () => {
    return <App/>;
}
