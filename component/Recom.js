import { StyleSheet, Text, View, Image, FlatList, ScrollView,TouchableOpacity } from 'react-native';
import React, { useState} from 'react';
import Store from './store';
import { Assets } from 'react-navigation-stack';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StoreAll from '../page/StoreAll';





const Recom = () => {

  const navigation = useNavigation();

  

  return (
    <View>
      <View style={{flexDirection: 'row',}}>
      <Text style={styles.textinside}>ร้านอาหารแนะนำ</Text>
        <TouchableOpacity
          style={styles.editPassButton}
          onPress={() => navigation.navigate('StoreAll')}
        >
          <Text style={styles.textbutton}>ดูร้านทั้งหมด</Text>
        </TouchableOpacity>
      </View>  
      <View style={{ height: 220, marginTop: 15, marginLeft: 15, }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft:0,}}>
            <Store ImageUri={require('../img/assets/Food/Res2/food1.jpg')} name="ร้านลุงใจ" />
            <Store ImageUri={require('../img/assets/Food/Res2/food2.jpg')} name="ร้านลุงพล" />
            <Store ImageUri={require('../img/assets/Food/Res2/food3.jpg')} name="ร้านป้าสมจิต" />
          <Store ImageUri={require('../img/assets/Food/Res2/food4.jpg')} name="ร้านอีหยังหึ" />
          </ScrollView>
      </View>
    </View>
  );
}


export default Recom;

const styles = StyleSheet.create({
  container: {
    marginTop: '0%',
    alignItems: 'flex-start',
    backgroundColor: 'black',
    width: '100%',
    height: '35%',
    padding: '0%',
  },
  Images: {
    width: 100,
    height: 100,
  },
  editPassButton: {
    width: 100,
    height: 20,
    alignSelf: 'center',
    marginTop: '4%',
    marginBottom: 0,
    borderRadius: 0,
    marginLeft: '20%',
  },
  textinside: {
    marginTop: '3%',
    fontSize: 20,
    marginLeft: '2%',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    textAlign: 'left',
  },
  textbutton: {
    marginTop: 0,
    color: 'blue',
    alignSelf: 'center',
    fontSize: 14,
    
  },
  storelist: {
    paddingVertical: '1%',
  },
  separator: {
    width: 10,
  },
  contentContainerStyle: {
    paddingLeft: 10, // ปรับขนาดระยะห่างภายใน FlatList
    paddingRight: 20,
  },
});