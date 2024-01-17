import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, PermissionsAndroid, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const MapViewScreen = ({ onClose, setMarkerPosition }) => {
  const [markerPosition, setMarkerPositionInternal] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocoder.init('AIzaSyDcF73H-nleZ35XYSS8PedHOtnBk-8h5wc'); // Replace with your own Google Maps API key
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPositionInternal({ latitude, longitude });
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const reverseGeocode = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPositionInternal({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  const handleBackButtonPress = () => {
    onClose();
  };

  const handleSaveButtonPress = () => {
    setMarkerPosition({ ...markerPosition, address });
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
          <Image source={require('../img/assets/Icon/arrow_left.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
      </View>
      <MapView style={styles.map} onPress={handleMapPress}>
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
      <FAB style={styles.plusicon} onPress={handleSaveButtonPress} icon="check" />
    </SafeAreaView>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    plusicon: {
        position: 'absolute',

        bottom: 70,
        marginTop: 30,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButtonImage: {
        position: 'absolute',
        width: 50,
        height: 50,
    },
});
