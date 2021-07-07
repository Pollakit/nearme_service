//This file is associated with chapter 6, from video 48 (the modifying color of a square thing)
import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';

const ColorCounter = ({color, onIncrease, onDecrease}) =>{                          //we can use props here too, but we're destructuring it so we use {color} and the callback functions {onIncrase, onDecrease}
    return <View>
            <Text>{color}</Text>
            <Button onPress={()=> onIncrease()} title={`Increase ${color}`}/>           
            <Button onPress={()=> onDecrease()} title={`Decrease ${color}`}/>
        </View>                                                                     //The line above is string interpolation or mixing variable with string. The syntax above is required to do it (using backtick ` ` and dollar sign $)


};

const styles = StyleSheet.create({});

export default ColorCounter;