
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,SafeAreaView } from 'react-native';
import React from 'react'
import SearchCom from '../component/SearchCom';
import LikeList from '../component/LikeList';

const LikeScreen = () => {
  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#ffe073',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '5%',
    }}>
      
      
      <ScrollView contentContainerStyle={styles.container} Vertical showsVerticalScrollIndicator={false}>
        <Text style={styles.textinside}>ร้านโปรดของคุณ</Text>
            <LikeList img = {require('../img/assets/Food/Res1/main.jpg')} name='มันส์ไก่' distance='2.0 km' rating='5.0' price='$$$$' category='อาหารตามสั่ง'/>
            <LikeList img={require('../img/assets/Food/Res2/main.jpg')} name='กุ้งแซ่บเวอร์' distance='5.0 km' rating='5.0' price='$$$' category='อาหารตามสั่ง' />
            <LikeList img={require('../img/assets/Food/Res2/main.jpg')} name='กุ้งแซ่บเวอร์' distance='5.0 km' rating='5.0' price='$$$' category='อาหารตามสั่ง' />
            <LikeList img={require('../img/assets/Food/Res2/main.jpg')} name='กุ้งแซ่บเวอร์' distance='5.0 km' rating='5.0' price='$$$' category='อาหารตามสั่ง' />
            <LikeList img={require('../img/assets/Food/Res2/main.jpg')} name='กุ้งแซ่บเวอร์' distance='5.0 km' rating='5.0' price='$$$' category='อาหารตามสั่ง' />
            <LikeList img = {require('../img/assets/Food/Res2/main.jpg')} name='กุ้งแซ่บเวอร์' distance='5.0 km' rating='5.0' price='$$$' category='อาหารตามสั่ง'/>
      </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containertop: {
    flex: 1,
    backgroundColor: '#ffe073', // Background color of the entire screen
    paddingTop: '0%',
  },
  container: {
    
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  container1: {
    marginTop: '0%',
    width: '100%',
      height : '5%',
      alignItems: 'flex-start',
    //backgroundColor: 'white',
    },
  textinside: {
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 28,
    marginLeft: '0%',
    fontWeight: 'bold',
    
  },
});

export default LikeScreen