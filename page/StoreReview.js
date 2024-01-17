import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';

import AddReview from './AddReview';

const Stack = createStackNavigator();

const StoreReviewStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="StoreReview" component={StoreReview} />
    {/* อาจมีหน้าจออื่น ๆ ที่คุณต้องการเพิ่มใน Stack Navigator นี้ */}
  </Stack.Navigator>
);

const StoreReview = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleAddReviews = (item) => {
    navigation.navigate('AddReview', { item: item }); // ลิงค์ไปยังหน้า AddReview
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.upperContainer}>
          <Image source={require('../img/assets/Food/Res1/food1.jpg')} style={styles.image} />
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>กลับ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerDetail}>
          <Text style={styles.title}>{item.RestaurantName}</Text>
          <View style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 30, paddingBottom: 7,paddingTop: -2 }}>4.1</Text>
            <Text style={{ fontSize: 25, paddingBottom: 7,paddingTop: -2 }}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
            <TouchableOpacity style={{paddingLeft: 8}} onPress={() => handleAddReviews(item)}>
              <Text style={{fontSize: 20, paddingBottom: 7,paddingTop: -2 }}>+เพิ่มรีวิวของคุณ</Text>
            </TouchableOpacity>
          </View>

          

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../img/assets/Food/Res1/food1.jpg')} style={styles.profileimage} />
            <View style={{alignItems: 'flex-start'}}>
            <Text style={{ fontSize: 18, paddingLeft: 10 }}>UserName</Text>
            <Text style={{ fontSize: 18, paddingLeft: 10 }}>⭐ ⭐ ⭐ ⭐ ⭐ 4.1</Text>
            </View>
          </View>

          <View>
            <Text style={styles.reviewtext}>Review Detail</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={styles.reviewimage}
              source={require('../img/assets/Food/Res1/nod.jpg')}
            />
            
              <Image
              style={styles.reviewimage}
              source={require('../img/assets/Food/Res1/food2.jpg')}
            />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={styles.reviewimage}
              source={require('../img/assets/Food/Res1/nod.jpg')}
            />
            
              <Image
              style={styles.reviewimage}
              source={require('../img/assets/Food/Res1/food2.jpg')}
            />
            </View>

          </View>
        </View>
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
    //paddingLeft: 20,
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
    textAlign: 'center',
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  reviewimage: {
    width: '45%', 
    height: 120, 
    margin: 5 ,
    //marginLeft: 15,
    borderRadius: 15,
  },
  reviewtext: {
    fontSize: 18,
    marginLeft: 15,
  },
});

export default StoreReviewStack;