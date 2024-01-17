import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../page/HomeScreen';
import MapViewScreen from '../page/MapView';

const NowLo = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleMarkerPress = (e) => {
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const handleMapClose = () => {
    setShowMap(false);
  };

  const handleMapSave = (position) => {
    setMarkerPosition(position);
    setShowMap(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 120, height: 100, marginTop: 0, marginLeft: -2 }}
        source={require('../img/assets/Icon/gps.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.TextLo}>ที่อยู่ของคุณตอนนี้</Text>
        <Text style={styles.address}>
          {markerPosition ? `ตำแหน่งที่เลือก: ${markerPosition.address}` : 'โรงพักโพธิ์กลาง'}
        </Text>
        <TouchableOpacity style={styles.addressedit} onPress={() => setShowMap(true)}>
          <Text>🗺️แก้ไขที่อยู่</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showMap} animationType="slide">
        <MapViewScreen onClose={handleMapClose} setMarkerPosition={handleMapSave} />
      </Modal>
    </View>
  );
};

export default NowLo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#75d6a7',
    marginTop: '1%',
    width: '85%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginButtom: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 8,
  },
  TextLo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  address: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 3,
  },
  addressedit: {

    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
    color: 'grey',
  },
});