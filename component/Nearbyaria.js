import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Nearbyaria = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DetailStore'); // แก้ไขชื่อหน้าเป็น 'DetailStore' หรือชื่อหน้าที่ถูกต้องใน Navigator ของคุณ
  };

  return (
    <TouchableOpacity
      style={{
        height: 190,
        width: 130,
        marginLeft: 20,
        borderColor: '#dddddd',
        padding: 0,
      }}
      onPress={handlePress}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={props.ImageUri}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={{ backgroundColor: 'white', height: 50, justifyContent: 'center' }}>
        <Text style={{ color: 'black', backgroundColor: 'white', textAlign: 'center' }}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Nearbyaria;
