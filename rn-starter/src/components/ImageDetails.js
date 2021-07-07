//This file is associated with the topic of chapter 5, reusuable component and showing images

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';             // need an import of Images to use image

const ImageDetail = props => {  //({imageSource, title, score})         // imagedetail is child of imagescreen, and props here is essentially what object we got from the parent (we named the prop itself "title" in imagescreen)
    return (
        <View>
            <Image source={props.imageSource}/>
            <Text>{props.title}</Text>
            <Text>Image score - {props.score}</Text>
        </View>                                                         // props.title because yeah, thats what we named it in imagescreen
    );
};                                                                      //an example of hard code image instead of passing by prop : <Image source={require('../../assets/beach.jpg')}/>

const styles = StyleSheet.create({});

export default ImageDetail;