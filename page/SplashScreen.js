import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, FlatList, Image} from 'react-native'


export default function SplashScreenComponent() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  // ตัวอย่าง UI ของ Splash Screen
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#ffe073' }}>
      <Image source={require('../ipp.png')} />
    </View>
  );
}
