import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import "@firebase/auth";

const Edituser = ({ route }) => {
  const { userData } = route.params; // Extract the userData prop
  const [name, setName] = useState(userData.FirstName || "");
  const [lastName, setLastName] = useState(userData.LastName || "");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || "");

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const docRef = doc(firestore, "user", user.uid);
        await updateDoc(docRef, {
          FirstName: name,
          LastName: lastName,
          phoneNumber: phoneNumber,
        });
        alert("แก้ไขข้อมูลเสร็จสิ้น");
        navigation.goBack();
      }
    } catch (error) {
      alert("Error updating user data:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Image
          source={require("../img/assets/Icon/arrow_left.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Text style={styles.title} value={"Hello"}>
        แก้ไขข้อมูลบัญชี{"\n"}
        {"\n"}
        {"\n"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อ"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="นามสกุล"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="เบอร์โทรศัพท์"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffe073",
    paddingTop: 50, // Adjust this value to move the content further up
  },
  backButtonImage: {
    width: 70, // Set the width of the image as per your requirement
    height: 70, // Set the height of the image as per your requirement
    marginRight: 5, // Add margin if needed
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 10,
    borderWidth: 0,
    borderColor: "gray",
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#75d6a7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
});

export default Edituser;
