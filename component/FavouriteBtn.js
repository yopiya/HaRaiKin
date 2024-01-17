import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function FavouriteBtn() {
    const [isFilled, setIsFilled] = useState(false);
  
    const handleIconPress = () => {
      setIsFilled(!isFilled);
    };
  
    return (
      <TouchableOpacity onPress={handleIconPress}>
        {isFilled ? (
          <Ionicons name="heart" size={28} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={28} color="red" />
        )}
      </TouchableOpacity>
    );
  }