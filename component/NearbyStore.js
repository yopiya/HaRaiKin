/*NearbyStore.js */
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Nearbyaria from './Nearbyaria'

import { Assets } from 'react-navigation-stack';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StoreAll from '../page/StoreAll';

const NearbyStore = () => {

  const navigation = useNavigation();

  return (
    <View>
      <View style={{flexDirection: 'row',}}>
      <Text style={styles.textinside}>ร้านอาหารแถวนี้</Text>
        <TouchableOpacity style={styles.editPassButton}
            onPress={() => navigation.navigate('changePassword')}>
          <Text style={styles.textbutton}>ดูร้านทั้งหมด</Text>
        </TouchableOpacity>
      </View>
      <View style={{height:220, marginTop:15, marginLeft:15,}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft:0,}}>
            <Nearbyaria ImageUri={require('../img/assets/Food/Res1/food1.jpg')} name="ร้านข้าวมันไก่ไหหลำ" />
            <Nearbyaria ImageUri={require('../img/assets/Food/Res1/pick.jpg')} name="ร้านมารวยหมูกระทะ" />
            <Nearbyaria ImageUri={require('../img/assets/Food/Res1/nod.jpg')} name="ร้านก๋วยเตี๋ยวแม่ใจ" />
            <Nearbyaria ImageUri={require('../img/assets/Food/Res1/padthai.jpg')} name="ร้านผัดไทเจ๊ตุ๊" />
          </ScrollView>
      </View>
    </View>
  )
}

const NearbyStorew = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AccScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccScreen" component={AccScreen} />
      <Stack.Screen name="EditAcc" component={editAcc} options={{ title: 'แก้ไขบัญชี' }} />
      <Stack.Screen name="changePassword" component={changePassword} options={{ title: 'แก้ไขบัญชี' }} />
    </Stack.Navigator>
  );
}

export default NearbyStore

const styles = StyleSheet.create({
    container: {
        marginTop: '0%',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        width: '100%',
        height: '30%',
    },
    textinside: {
        marginTop: '3%',
    fontSize: 20,
    marginLeft: '2%',
    fontWeight: 'bold',
    paddingHorizontal: 20,
      textAlign: 'left',
    marginLeft: '2%',
  },
    textbutton: {
    marginTop: 0,
    color: 'blue',
    alignSelf: 'center',
    fontSize: 14,
    
  },
    editPassButton: {
    width: 100,
    height: 20,
    alignSelf: 'center',
    marginTop: '4%',
    marginBottom: 0,
    borderRadius: 0,
    marginLeft: '22%',
  },

});