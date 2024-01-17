import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Button ,} from 'react-native'
import React, { useState,useEffect } from 'react'
import Recom from '../component/Recom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firestore,collection, getDocs } from '../firebase';

import { DeviceEventEmitter} from 'react-native';

import { Accelerometer  } from 'expo-sensors';



function RandomScreen() {

  const [randomStore, setRandomStore] = useState(null);

  const getRandomStoreData = async () => {
    try {
      const storesRef = collection(firestore, 'restaurant');
      const snapshot = await getDocs(storesRef);
      const storeList = [];

      snapshot.forEach((doc) => {
        storeList.push(doc.data());
      });

      const randomIndex = Math.floor(Math.random() * storeList.length);
      const randomStore = storeList[randomIndex];

      setRandomStore(randomStore);
      
    } catch (error) {
      console.log('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    let subscription;

    const shakeHandler = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      if (acceleration > 3) {
        getRandomStoreData();
        alert('คุณได้เขย่าเพื่อสุ่มแล้ว นี่คือร้านของคุณ!!!');
        
      }
    };

    const startShakeDetection = async () => {
      subscription = Accelerometer.addListener(shakeHandler);
    };

    const stopShakeDetection = () => {
      subscription && subscription.remove();
    };

    startShakeDetection();

    return () => {
      stopShakeDetection();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1stline}>สุ่มร้านอาหาร</Text>
      <Text style={styles.text2ndline}>ไม่รู้จะกินที่ไหน เราช่วยได้</Text>
      <View style={styles.triangle} />
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        {randomStore && (
          <View
            style={{
              backgroundColor: 'white',
              height: 400,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              borderRadius: 25,
              padding: 10
            }}
          >
            <Image source={{ uri: randomStore.mainPic }} style={{ width: '100%', height: '68%', borderRadius: 16 }} />
            <View style={{ marginTop: 5 }}>
              <View style={{ width: '100%', height: '30%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                  {randomStore.RestaurantName}
                </Text>
                <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 18 }}>
                  ประเภทร้าน: {randomStore.Type}
                </Text>
                <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 18 }}>
                  เวลาทำการ: {randomStore.timeOpen} - {randomStore.timeClose}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.randomstoreButton}
        onPress={getRandomStoreData}
        onLongPress={getRandomStoreData}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white' }}>RANDOM STORE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe073',
   

  },
  randomstoreButton: {
    borderRadius: 50,
    mar: 0,
    backgroundColor: '#75D6A7',
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 60,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text1stline: {
    marginTop: '2%',
    fontSize: 36,
    marginLeft: '0%',
    fontWeight: 'bold',
    color: 'black',
  },
  text2ndline: {
    marginTop: '2%',
    fontSize: 14,
    marginLeft: '0%',
    fontWeight: 'normal',
    color: 'grey',
  },
  triangle: {
    marginTop: '5%',
    borderTopWidth: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    marginBottom: '3%',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: '#75d6a7',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  bodyrandomfun: {
    marginTop: '1%',
    width: '100%',
    height: '45%',
    backgroundColor: 'white',
    justifyContent: 'center', // ใช้ชั่วคราว
    alignItems: 'center', // ใช้ชั่วคราว
  },
  emtrytext: {
    marginTop: 9,
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0, // ใช้ชั่วคราว
  },
  emtrytext2: {
    marginTop: 9,
    color: 'blue',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editAccButton: {
    width: 200,
    height: 50,
    backgroundColor: '#75d6a7',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 10,
    marginBottom: '-40%', // ใช้ชั่วคราว
  },
});

export default RandomScreen;
