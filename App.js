import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView,Alert } from "react-native";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './page/HomeScreen';
import RandomScreen from './page/RandomScreen';
import LikeScreen from './page/LikeScreen';
import AccScreen from './page/AccScreen';
import { auth } from "./firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firestore from './firebase';

import { ActivityIndicator } from 'react-native';
import '@firebase/auth';

import SplashScreen from './page/SplashScreen';

function MyTabBar({ state, descriptors, navigation, logout }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (route.name === "Logout") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={logout}
              style={[styles.tabButton, isFocused && styles.tabButtonActive]}
            >
              <View style={styles.tabContent}>
                  
                    <Image
                      source={options.tabBarIcon}
                      style={[styles.tabIcon, isFocused && styles.tabIconActive]}
                    />
                  
                  <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                    {label}
                  </Text>
                </View>
            </TouchableOpacity>
          );
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabButton, isFocused && styles.tabButtonActive]}

          >

            <View style={styles.tabContent}>
              <Image
                source={options.tabBarIcon}
                style={[styles.tabIcon, isFocused && styles.tabIconActive]}
              />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();




function LoggedIn({ setLoggedIn }) {
  /* pop-up ออกจากระบบ */ 
  const logout = async () => {
    Alert.alert(
      'ออกจากระบบ',
      'คุณต้องการออกจากระบบหรือไม่?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ออกจากระบบ',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  

  return (

    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} logout={logout} />}>
        <Tab.Screen
          name="หน้าหลัก"
          component={HomeScreen}
          options={{
            tabBarLabel: 'หน้าหลัก',
            tabBarIcon: require('./img/pngegg.png'),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="สุ่มอาหาร"
          component={RandomScreen}
          options={{
            tabBarLabel: 'สุ่มอาหาร',
            tabBarIcon: require('./img/magicbox.png'),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="ร้านโปรด"
          component={LikeScreen}
          options={{
            tabBarLabel: 'ร้านโปรด',
            tabBarIcon: require('./img/105220.png'),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="บัญชี"
          component={AccScreen}
          options={{
            tabBarLabel: 'บัญชี',
            tabBarIcon: require('./img/61205.png'),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Logout"
          component={AccScreen}
          options={{
            tabBarLabel: 'ล็อกเอาท์',
            tabBarIcon: require('./img/logout.png'),
            headerShown: false,
          }}t
        />

      </Tab.Navigator>
    </NavigationContainer>

  )
}


function Signup({ setScreen }) {
  const [fName, setfName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        const firestore = getFirestore();
        const collRef = doc(firestore, 'user', user.uid);
        await setDoc(collRef, {
          FirstName: fName,
          LastName: LName,
          Email: email,
        });
  
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError("There was a problem creating your account");
    }
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>

      <View style={styles.iconsection}>
        <TouchableOpacity onPress={() => setScreen("login")} style={{ left: 25 }}>
          <AntDesign name="arrowleft" size={35} color="#ff6d60" />
        </TouchableOpacity>
      </View>

      <View style={styles.outer}>

        <View style={styles.inner}>

          <Image source={require('./img/assets/haraikin_logo_text.png')}
            style={{ width: 215, height: 175, marginBottom: 0, marginTop: 0, alignSelf: 'center' }}
          />

          {error && <Text style={styles.error}>{error}</Text>}
          <View style={{ alignItems: "center" }}>

            <TextInput
              value={fName}
              onChangeText={setfName}
              placeholder="ชื่อ"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={[styles.input, { marginBottom: 15, marginTop: 20 }]}
            />

            <TextInput
              value={LName}
              onChangeText={setLName}
              placeholder="นามสกุล"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={[styles.input, { marginBottom: 15 }]}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="อีเมล"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={[styles.input, { marginBottom: 15 }]}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="รหัสผ่าน"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={[styles.input, { marginBottom: 15 }]}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="ยืนยันรหัสผ่าน"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={[styles.input, { marginBottom: 0 }]}
            />

            <TouchableOpacity onPress={createAccount} disabled={!email || !password || !confirmPassword}>
              <View style={styles.oButton}>
                <Text style={styles.oButtonText}>สร้างบัญชี</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

function Login({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    }
  }

  return (
    <View style={styles.outer}>
      
      <Image source={require('./img/assets/haraikin_logo_text.png')}
        style={{ width: 300, height: 249, marginBottom: 20, marginTop: 0, alignSelf: 'center' }}
      />
      <View style={styles.inner}>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={{ alignItems: 'center' }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="อีเมล"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={[styles.input, { marginBottom: 20 }]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="รหัสผ่าน"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setScreen("reset-password")}>
            <Text style={styles.link2}>ลืมรหัสผ่าน</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={loginUser} disabled={!email || !password}>
            <View style={styles.oButton}>
              <Text style={styles.oButtonText}>เข้าสู่ระบบ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("signup")}>
            <Text style={styles.link}>ยังไม่มีบัญชี?</Text>
          </TouchableOpacity>



        </View>
      </View>
    </View>
  )
}

function ResetPassword({ setScreen }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("ชื่อผู้ใช้ถูกใช้งานไปแล้ว")
      }
    }
  }

  return (
     <View style={styles.outer}>
      <View style={styles.inner}>
          <Text style={styles.header}>รีเซ็ตรหัสผ่าน</Text>

          {error && <Text style={styles.error}>{error}</Text>}


          {
            submitted ? (
              <>
                <Text style={styles.resetbox}>ตรวจสอบและยืนยันลิ้งค์เปลี่ยนรหัสผ่านที่อีเมลของคุณ</Text>
                
              </>
            ) : (

              <>

                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="อีเมล"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                  />
                  <TouchableOpacity onPress={resetUserPassword} disabled={!email}>
                    <View style={styles.oButton}>
                      <Text style={styles.oButtonText}>ยืนยัน</Text>
                    </View>
                  </TouchableOpacity>


                </View>
              </>
            )
          }

        </View>
            <TouchableOpacity onPress={() => setScreen("login")} style={{marginTop:30}}>
                <View style={styles.oButton3}>
                  <Text style={styles.oButtonText2}>กลับสู่หน้าเข้าสู่ระบบ</Text>
                </View>
            </TouchableOpacity>
      </View>

  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn setLoggedIn={setLoggedIn} />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    if (screen === "reset-password") return <ResetPassword setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  return (
    <View style={{ flex: 1 }}>
      
      {getScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  resetbox: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },

  iconsection: {
    paddingTop: 40,
    backgroundColor: '#ffe073',

  },

  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe073',

  },
  inner: {
    width: 260,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    fontSize: 18,
    borderWidth: 0,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    width: 295,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,

  },
  error: {
    marginBottom: 20,
    color: 'red'
  },

  tabBar: {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ff6d60', //สีพื้นหลังเมนูบาร์
  },
  tabButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabButtonActive: {

    backgroundColor: '#f45144', // เปลี่ยนสีพื้นหลังเมนูที่ถูกกด
  },
  tabContent: {
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  tabIconActive: {

    tintColor: 'white', // เปลี่ยนสีไอคอนที่ถูกกด
  },
  tabLabel: {
    marginTop: 6,
    fontSize: 12,
    color: 'white',
  },
  tabLabelActive: {
    fontSize: 12,
    color: 'white',
  },
  oButton: {
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75d6a7',
    width: 295,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#75c6a7',

  },
  oButtonText: {
    fontSize: 20,
    color: 'white',
  },
  oButtonText2: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#424a88',
  },
  oButton2:{
    marginTop: 5,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75d6a7',
    width: 260,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#75c6a7',
  },
  oButton3:{
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link2: {
    marginTop: 5,
    left: 100,
    fontSize: 17,
    textDecorationLine: 'underline',
    color: '#424a88',
  },
  link: {
    alignItems: 'center',
    color: 'blue',
    marginBottom: 20,
    fontSize: 17,
    textDecorationLine: 'underline',
    color: '#424a88',

  },
});
