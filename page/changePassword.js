import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';


function EditPassword({}) {
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [warningHeight] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const validateNewPass = (password) => {
    if (password.length < 8) {
      return 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
    }
    return '';
  };

  
  async function handleSubmit() {
    if (!pass || !newPass || !confirmPass) {
      alert('Please fill in all fields');
      return;
    }
    
    if (newPass !== confirmPass) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, pass);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPass);
      Alert.alert('Success', 'Password updated successfully.');
      handleGoBack(); // Optional: Go back to the previous screen after successful password update
    } catch (error) {
      Alert.alert('Error', 'Failed to update password. Please try again.');
      console.error(error);
    }
  }
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOldPassChange = (text) => {
    setPass(text);
    setPassError('');
  };

  const handleNewPassChange = (text) => {
    setNewPass(text);
    setNewPassError(validateNewPass(text));
    setConfirmPassError(newPass !== text ? 'Passwords do not match.' : '');
  };

  const handleConfirmPassChange = (text) => {
    setConfirmPass(text);
    setConfirmPassError(newPass !== text ? 'Passwords do not match.' : '');
  };

  useEffect(() => {
    animateWarning();
  }, [passError, newPassError, confirmPassError]);

  const animateWarning = () => {
    Animated.timing(warningHeight, {
      toValue: passError || newPassError || confirmPassError ? 70 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Image source={require('../img/assets/Icon/arrow_left.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.title}>แก้ไขรหัสผ่าน</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่านเดิม"
          value={pass}
          onChangeText={handleOldPassChange}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่านใหม่"
          value={newPass}
          onChangeText={handleNewPassChange}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="ยืนยันรหัสผ่านใหม่"
          value={confirmPass}
          onChangeText={handleConfirmPassChange}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ยืนยันการแก้ไข</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.warningContainer, { height: warningHeight }]}>
        {passError !== '' && <Text style={styles.warningText}>{passError}</Text>}
        {newPassError !== '' && (
          <Text style={[styles.warningText, newPass.length < 8 && { color: 'red' }, newPass.length >= 8 && { color: 'red' }]}>
            {newPassError}
          </Text>
        )}
        {confirmPassError !== '' && <Text style={styles.warningText}>{confirmPassError}</Text>}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffe073',
    paddingTop: 50,
  },
  backButtonImage: {
    width: 70,
    height: 70,
    marginRight: 5,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: 'black',
  },
  form: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#75d6a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  warningContainer: {
    margin: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  warningText: {
    fontWeight: 'bold',
    color: 'red',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
});

export default EditPassword;
