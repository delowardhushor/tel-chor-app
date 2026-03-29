import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import InnerLayer from "../components/InnerLayer";
import { useDispatch, useSelector } from "react-redux";
import FullButton from "../components/FullBtn";
import React from "react";
import Spacing from "../components/Spacing";
import axios from "axios";
import { IMAGE_BASE_URL, toBanglaNumber } from "../utils/uti";
import moment from "moment";
import "moment/locale/bn";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
moment.locale("bn");

import QRCode from 'react-native-qrcode-svg';
import { setUserType, setVehicle } from "../store/appSlice";


export default function QRScreen({ navigation }) {

    const dispatch = useDispatch()

    const vehicle = useSelector(state => state.app.vehicle);

    const clear = () => {
        dispatch(setVehicle(null));
        dispatch(setUserType(""));
    }

    return (
        <InnerLayer>
            <View>
                <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 50 }}>
                    আপনার নাম্বার প্লেটের QR কোড
                </Text>
                <Text style={{fontSize: 12, textAlign: "center", fontWeight:'600'}} >তেল ক্রয়ের সময় এই QR কোডটি পাম্প অপারেটরকে স্ক্যান করতে বলুন</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <QRCode
                value={vehicle}
                    size={280}
                />
            </View>

            <FullButton title="হোমে ফিরে যান" onPress={() => {
                clear();
            }} />
            
        </InnerLayer>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColorL: "#eee",
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pumpName: {
        fontSize: 24,
        fontWeight: "SemiBold",
    },
    pumpLocation: {
        fontSize: 16,
        color: "#555",
    },
    noVehiclesText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        maxWidth: 250,
        fontWeight: '600'
    }
});