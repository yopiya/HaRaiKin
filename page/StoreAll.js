import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, FlatList, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { collection, getDocs } from '../firebase';
import { firestore } from '../firebase';

import StoreReview from './StoreReview';

const StoreAll = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContainerPress = (item) => {
    navigation.navigate('DetailStore', { item: item });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const [data, setData] = useState([]);

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
      <SafeAreaView
      style={styles.droidSafeArea}>
      <View
              style={styles.headContainer}>
              <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleGoBack}>
                    <FontAwesome name="arrow-left"
                      size={32}
                      color="black"
                    />
                </TouchableOpacity>
              <Text
                  style={styles.editText}>ร้านทั้งหมด
              </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
          
      <View style={styles.horizontalContainer}>
            <FlatList
              data={data}
              renderItem={renderMerchant}
              keyExtractor={item => item.id}
              vertical
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
    );
}

export default StoreAll

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ffe073',    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  droidSafeArea: {
  flex: 1,
  backgroundColor: '#ffe073',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    marginBottom: '2%',
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
});



