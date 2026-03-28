import { StyleSheet, View, Text } from "react-native";
import FullButton from "../components/FullBtn";
import Input from "../components/Input";
import InnerLayer from "../components/InnerLayer";
import Spacing from "../components/Spacing";
import { useDispatch } from "react-redux";
import { setUserType, UpdatePump } from "../store/appSlice";
import axios from "axios";
import React from "react";

export default function PumpSignUp({ navigation }) {

    const dispatch = useDispatch();

    

    const [loading, setLoading] = React.useState(false);

    const [pumpName, setPumpName] = React.useState("");
    const [pumpAddress, setPumpAddress] = React.useState("");

    const onPress = async () => {
        if (!pumpName || !pumpAddress) {
            // Show error message
            return;
        }
        setLoading(true);
        const res = await axios.post("https://telchorapi.bitbytetec.com/pumps", {
            name: pumpName,
            location: pumpAddress,
        })
        if(res?.data?.success && res?.data?.data?._id){
            dispatch(UpdatePump(res?.data?.data));
            dispatch(setUserType("pump"));
        }
        setLoading(false);
    }


    return (
        <InnerLayer>
            <View style={styles.container}>
                <Input label={"পাম্পের নাম"} value={pumpName} onChangeText={setPumpName} />
                <Spacing vertical={20} />
                <Input label={"পাম্পের ঠিকানা"} value={pumpAddress} onChangeText={setPumpAddress} />
                <Spacing vertical={20} />
                <FullButton title="পাম্প অপারেটর হিসাবে সাইন আপ" onPress={onPress} />
            </View>
        </InnerLayer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
});