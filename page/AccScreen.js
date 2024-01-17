import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import editAcc from "./editAcc";
import changePassword from "./changePassword";
import StoreAll from "./StoreAll";
import DetailStore from "./DetailStore";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import "@firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import DeleteAcc from "../page/DeleteAcc";

const Stack = createStackNavigator();

const AccScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [showStore, setShowStore] = useState(true);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAcc"
        component={editAcc}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={changePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="DeleteAcc" component={DeleteAcc} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

function AccountContent() {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const firestore = getFirestore();
        const docRef = doc(firestore, "user", user.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        }
      }
    }
    if (isFocused) {
    fetchUserData();
  }
}, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView/>
      <View style={styles.scrollContainer}>
        <Text style={styles.texthua}>ข้อมูลบัญชี</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.hua}>ชื่อผู้ใช้</Text>
          <Text style={styles.subhua}>{auth.currentUser.uid}</Text>
          <Text style={styles.hua}>ชื่อ</Text>
          <Text style={styles.subhua}>{userData && userData.FirstName}</Text>
          <Text style={styles.hua}>นามสกุล</Text>
          <Text style={styles.subhua}>{userData && userData.LastName}</Text>
          <Text style={styles.hua}>เบอร์โทรศัพท์</Text>
          <Text style={styles.subhua}>{userData && userData.phoneNumber}</Text>
          <Text style={styles.hua}>อีเมล</Text>
          <Text style={styles.subhua}>{auth.currentUser.email}</Text>
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.editAccButton}
            onPress={() =>
              navigation.navigate("EditAcc", {
                userData: userData, // Pass the user data as a prop
              })
            }
          >
            <Text style={styles.textbutton}>แก้ไขข้อมูลบัญชี</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editPassButton}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.textbutton}>เปลี่ยนรหัสผ่าน</Text>
          </TouchableOpacity>

        </View>
        <View style={{ alignItems: "center", marginLeft: -20}}>
        <TouchableOpacity
            style={styles.deleteAccButton}
            onPress={() => navigation.navigate("DeleteAcc")}
          >
            <Text style={styles.textbutton}>ลบบัญชี</Text>
          </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe073",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "5%",
  },
  scrollContainer: {
    flexGrow: 0,
    backgroundColor: "#ffe073",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  hua: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 10,
    color: "black",
  },
  subhua: {
    fontSize: 16,
    padding: 10,
    marginTop: 0,
    color: "black",
  },
  texthua: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 15,
    marginTop: 0,
    marginBottom: 10,
    color: "black",
  },
  textbutton: {
    marginTop: 12,
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  textbutton1: {
    marginTop: 9,
    color: "white",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    width: 350,
    height: "auto",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 30,
  },
  editAccButton: {
    width: 150,
    height: 50,
    backgroundColor: "#75d6a7",
    alignSelf: "center",
    marginTop: -5,
    borderRadius: 30,
  },
  editPassButton: {
    width: 150,
    height: 50,
    backgroundColor: "#75D6A7",
    alignSelf: "center",
    marginTop: 14,
    marginBottom: 20,
    borderRadius: 30,
    marginLeft: 25,
  },
  deleteAccButton: {
    width: 150,
    height: 50,
    backgroundColor: "#ff3131",
    alignSelf: "center",
    marginTop: 14,
    marginBottom: 20,
    borderRadius: 30,
    marginLeft: 25,
    
  },
});

export default AccScreen; 
