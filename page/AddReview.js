import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TransitionSpecs } from "@react-navigation/stack";

const AddReview = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.upperContainer}>
          <Image
            
            style={styles.image}
          />
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>กลับ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerDetail}>
          <Text style={styles.title}>{item.RestaurantName}</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              คะแนนความพึงพอใจ
            </Text>
            <Text style={{ fontSize: 30, margin: 10 }}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
            <TextInput
              style={styles.inputbox}
              placeholder="เขียนรีวิวร้านค้า"
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.addimg}>
            <Image
            
            style={styles.iconimage}
          />
              <Text style={styles.buttonText}>เพิ่มรูปภาพ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.cftext}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe073",
  },
  upperContainer: {
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerDetail: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: "-10%",
    //paddingLeft: 20,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: StatusBar.currentHeight + 20,
    left: 20,
    zIndex: 1,
    paddingBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 360,
    marginTop: -30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 0,
    textAlign: "center",
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  reviewimage: {
    width: "45%",
    height: 120,
    margin: 5,
    //marginLeft: 15,
    borderRadius: 15,
  },
  reviewtext: {
    fontSize: 18,
    marginLeft: 15,
  },
  inputbox: {
    width: "90%",
    height: 200,
    backgroundColor: "#BEBEBE",
    //borderWidth: 1,
    padding: 15,
    fontSize: 18,
    margin: 10,
  },
  addimg: {
    width: "70%",
    height: 50,
    borderWidth: 3,
    borderColor: "#ff6d60",
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  confirmButton: {
    width: "70%",
    height: 50,
    backgroundColor: "#75d6a7",
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#ff6d60',
    //fontWeight: 'bold',
  },
  cftext: {
    fontSize: 18,
    //fontWeight: 'bold',
  },
  iconimage: {
    width: 30,
    height: 30,
    margin: 10,
  }
});

export default AddReview;