import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, FlatList, Image } from 'react-native';
import { collection, getDocs } from '../firebase';
import { firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppNavigator } from '../routes/AppNavigator'; 

import NowLo from '../component/NowLo';
import SearchCom from '../component/SearchCom';
import DetailStore from './DetailStore';
import StoreAll from './StoreAll';
import MapViewScreen from './MapView';
import StoreReviewStack from './StoreReview';



const Stack = createStackNavigator();

function HomeScreen() {

  const navigation = useNavigation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="DetailStore"
        component={DetailStore}
        options={{
          headerShown: false
        }}
      />
    <Stack.Screen
        name="StoreAll"
        component={StoreAll}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="StoreReviewStack" component={StoreReviewStack} />
      <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
    </Stack.Navigator>
  );

}


function Home() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const handleContainerPress = (item) => {
    navigation.navigate('DetailStore', { item: item });
  };

  const allStoreContainerPress = () => {
    navigation.navigate('StoreAll');
  };

  const allStoreContainerpost = () => {
    navigation.navigate('StoreReviewStack');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    try {
      const collectionRef = collection(firestore, 'restaurant');
      const snapshot = await getDocs(collectionRef);
      const documents = snapshot.docs.map(doc => doc.data());
      setData(documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMerchant = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleContainerPress(item)}>
      <View style={{flexDirection: 'row',}}>
        <Image source={{ uri: item.mainPic }} style={styles.image} />
        <View style={{width: '55%'}}> 
          <Text numberOfLines={1} style={styles.merchantName}>{item.RestaurantName}</Text>
          <Text style={{paddingLeft: 10,paddingBottom: 5}}>ประเภทร้าน: {item.Type}</Text>
          <Text style={styles.time}>เวลาทำการ: {item.timeOpen} - {item.timeClose}</Text>
          <Text numberOfLines={2} style={styles.addr}>ที่อยู่: {item.addr}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}

        
      >
<View style={styles.NowLo}><NowLo /></View>

      <View style={{flexDirection: 'row', marginLeft: -10, paddingTop: Platform.OS === 'android' ? 20 : 0,justifyContent:'space-between'}}>
  
            <Text style={styles.sectionTitle}>ร้านอาหารแนะนำ</Text>
              <TouchableOpacity style={{paddingTop: 11}} onPress={() => allStoreContainerPress()}>
                <Image source={require('../img/assets/Icon/b_arrow_right.png')} style={{width: 50,height: 50,}} />
              </TouchableOpacity>
      </View>
      


        
        <View style={{ paddingTop: 10 }}>
          
          <View style={styles.horizontalContainer}>
            <FlatList
              data={data}
              renderItem={renderMerchant}
              keyExtractor={item => item.id}
              vertical
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe073',    
  },  
  NowLo:{
    flex: 1,
    paddingBottom:25, 
    marginTop:25,
    height: '100%',

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  droidSafeArea: {
  flex: 1,
  backgroundColor: '#ffe073',
  paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  headContainer: {
    marginTop: '2%',
    alignItems: 'center',
    flexDirection: 'row',
  },
    backButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 1,
    marginBottom: 16,
    width: '100%',
    height: 165,
    marginRight: 5,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    
  },
  editText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 4,
    padding: 0,
    width: '40%',
    height: 153,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
  },
  time: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
    paddingBottom: 5,
  },
  addr: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
  },
  horizontalContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 30,
    paddingTop: 15,
    textAlign: 'left',
    
  },
});

export default HomeScreen;