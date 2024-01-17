import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TransitionSpecs } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FavouriteBtn from '../component/FavouriteBtn';


import { createStackNavigator } from '@react-navigation/stack';

import AddReview from './AddReview';


const DetailStore = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenNewPage = () => {
    navigation.navigate('AddReview', { item: item }); // เปลี่ยนชื่อ Stack และ Screen ตามที่คุณตั้งใน NavigationContainer
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
       
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.upperContainer}>
          <Image source={{ uri: item.mainPic }} style={styles.image} />
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back-circle"
                      size={40}
                      color="white"
                    />
          </TouchableOpacity>
          
        </View>
        <View style={styles.containerDetail}>
        <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
            <Text style={styles.title}>{item.RestaurantName}</Text>
           
            
            <View style={{paddingRight:15}}>
              
            <FavouriteBtn />
            
          </View>
         

            
            </View>
          
          

      

          <Text style={{ fontSize: 18, paddingBottom: 7 }}>ประเภทร้าน: {item.Type}</Text>
          
          <Text style={{ fontSize: 16, paddingBottom: 10}}>Time Open: {item.timeOpen} - {item.timeClose } น.</Text>
        
          <Text style={{ fontSize: 14, paddingBottom: 0}}>" {item.Detail} "</Text>
            
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Image
              style={{ width: 24, height: 64, marginTop: 0, marginLeft: -2 }}
              source={require('../img/assets/Icon/contact.png')}
            />
            
            <Text style={{ fontSize: 16, paddingBottom: 0,paddingLeft: 20 }}>{item.tel}</Text>

          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'flex-start',width: '85%' }}>

            <Image
              style={{ width: 60, height: 25, marginTop: 2 ,marginLeft: -20,marginButtons: 10}}
              source={require('../img/assets/Icon/address.png')}
            />
            <Text style={{ fontSize: 16, paddingBottom: 7, marginLeft: 2 }}>Address: {item.addr}</Text>

          </View>

          
          <Text style={{ fontSize: 24, paddingBottom: 7,fontWeight: 'bold',marginBottom: 10}}>เมนูอาหาร</Text>

          <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{marginLeft:0,}}Style={{ flexDirection: 'row', alignItems: 'flex-start', }}>

            <View style={{backgroundColor: 'transparent',borderRadius: 15,width: 140, height: 160,}}>
              <Image
                style={{ width: 130, height: 120, marginTop: 5 ,marginLeft: 5,borderRadius: 15,}}
                source={require('../img/assets/Food/Res1/food3.jpg')}
              />
              <Text style={{textAlign: 'center',paddingTop: 5}}>ก๋วยเตี๋ยว</Text>
            </View>
            
              <View style={{backgroundColor: 'transparent',borderRadius: 15,width: 140, height: 160,}}>
              <Image
                style={{ width: 130, height: 120, marginTop: 5 ,marginLeft: 5,borderRadius: 15,}}
                source={require('../img/assets/Food/Res1/nod.jpg')}
              />
              <Text style={{textAlign: 'center',paddingTop: 5}}>ข้าวมันไก๋</Text>
            </View>

              <View style={{backgroundColor: 'transparent',borderRadius: 15,width: 140, height: 160,}}>
              <Image
                style={{ width: 130, height: 120, marginTop: 5 ,marginLeft: 5,borderRadius: 15,}}
                source={require('../img/assets/Food/Res1/food2.jpg')}
              />
              <Text style={{textAlign: 'center',paddingTop: 5}}>ข้าวมันไก๋เหมี๋ยนกัน</Text>
            </View>

          </ScrollView>


          

          
          
          
          
          
          
          
          {/* แสดงข้อมูลอื่น ๆ ตามต้องการ */}
        </View>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe073'
  },
  upperContainer: {
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerDetail: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: '-10%',
    paddingLeft: 20,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 20,
    left: 20,
    zIndex: 1,
    paddingBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: 360,
    marginTop: -30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 0,
  },
  heartContainer: {
  alignItems: 'center',
  marginTop: 10,
},
});

export default DetailStore;
