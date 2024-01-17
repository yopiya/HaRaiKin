import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Image,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firestore from "../firebase";
import "@firebase/auth";
import { deleteDoc } from "firebase/firestore";

function EditPassword({ }) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handledelete = async () => {
        Alert.alert(
            "คำเตือน",
            "การลบบัญชีของคุณจะลบการเข้าถึงและข้อมูลทั้งหมดของคุณบนแอพริเคชั่นนี้ คุณแน่ใจหรือว่าต้องการดำเนินการต่อ?",
            [
                {
                    text: "ยกเลิก",
                },
                {
                    text: "ลบบัญชี",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const user = auth.currentUser;
                            const userUID = user.uid; // Get the user's UID

                            const firestore = getFirestore();

                            // Delete documents with user's UID
                            const userRef = doc(firestore, "user", userUID);
                            await deleteDoc(userRef);

                            await user.delete(); // Delete user account
                            await auth.signOut(); // Sign out the user
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
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Image
                    source={require("../img/assets/Icon/arrow_left.png")}
                    style={styles.backButtonImage}
                />
            </TouchableOpacity>
            <View style={styles.boxtt}>
                <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center'}}>ยืนยันการลบบัญชี?</Text>
            <Text style={styles.warning}>
            ข้อมูลทั้งหมดของคุณบนแอพพลิเคชั่นจะถูกลบ และไม่สามารถกู้คืนได้
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.deleteAccButton} onPress={handledelete}>
                <Text style={styles.textbutton}>ลบบัญชี</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.CanceldeleteAccButton}
                onPress={handleGoBack}
            >
                <Text style={styles.textbutton}>ยกเลิก</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ffe073",
        paddingTop: 150, // Adjust this value to move the content further up
    },
    deleteAccButton: {
        width: 130,
        height: 50,
        backgroundColor: "#ff3131",
        alignSelf: "center",
        margin:10,
        borderRadius: 30,
    
    },
    CanceldeleteAccButton: {
        width: 130,
        height: 50,
        backgroundColor: "#75d6a7", 
        alignSelf: "center",
        margin:10,
        borderRadius: 30,
    },
    textbutton: {
        marginTop: 12,
        color: "white",
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    warning: {
     
        marginTop: 12,
        color: "red",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom:12
    },

    backButtonImage: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 24,
        color: "black",
    },
    boxtt:{
        backgroundColor: '#fff',
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        margin:22
    }
});

export default EditPassword;
