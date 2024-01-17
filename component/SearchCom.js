import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const SearchCom = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // ทำสิ่งที่คุณต้องการเมื่อกดปุ่มค้นหา
    console.log('Searching for:', searchText);
    // เพิ่มโค้ดสำหรับการค้นหาข้อมูลที่คุณต้องการทำในส่วนนี้
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
      <TextInput
        style={styles.input}
        placeholder="ค้นหา..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
      <Feather name="search" size={24} color="black"  />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    flex: 0.8,
    height: 40,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: '8%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
      fontSize: 16,
    
  },
  searchButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    marginTop: '0%',
    backgroundColor: 'white',
    position: 'relative',
    width: 335,
  },
});

export default SearchCom;