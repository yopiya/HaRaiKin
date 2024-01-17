import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FavouriteBtn from './FavouriteBtn';


const LikeList = ({ img, name, distance, rating, price, category }) => {
  return (
    <TouchableOpacity style={styles.box}>
      <Image style={styles.mainImage} source={img} />
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.favouriteBtn}> 
          <FavouriteBtn />
          </View>
        </View>
        <Text style={styles.infoText}>
          {distance} {rating} {price}
        </Text>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LikeList;

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    height: 120,
    width: 350,
    flexDirection: 'row',
    marginBottom: 15,
  },
  mainImage: {
    height: 120,
    width: 150,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  favouriteBtn: {
    
    bottom: 0,
    right: 10,
  },
  infoText: {
    marginTop: 10,
  },
  categoryText: {
    marginTop: 5,
  },
});