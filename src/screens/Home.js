import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import InnerLayer from "../components/InnerLayer";
import { useSelector } from "react-redux";
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

export default function Home({ navigation }) {
    const pump = useSelector(state => state.app.pump);
    const [vehicles, setVehicles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const isFocused = useIsFocused()
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://telchorapi.bitbytetec.com/vehicles/pump/${pump._id}`);
            if (res?.data?.success) {
                setVehicles(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (pump?._id && isFocused) {
            fetchVehicles();
        }
    }, [pump?._id, isFocused]);

    const onPressStart = () => {
        navigation.navigate("AddFuel");
    }

    console.log("Vehicles:", vehicles);

    return (
        <InnerLayer>
            <View style={styles.header}>
                <View>
<Text style={styles.pumpName} >{pump.name}</Text>
                <Text style={styles.pumpLocation} >{pump.location}</Text>
                </View>
                <TouchableOpacity style={{
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    backgroundColor: "#222",
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                </TouchableOpacity>
                
            </View>
            <FlatList
                data={vehicles}
                ListHeaderComponent={
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }} >আপনার দ্বারা জ্বালানি সরবরাহকৃত যানবাহনের তালিকা</Text>
                }
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        borderColor: "#eee",
                        borderWidth: 0.5,
                        borderRadius: 5,
                        gap: 10
                    }} >
                        <Image source={{ uri: IMAGE_BASE_URL + item.image }} style={{ width: 80, height: 80, borderRadius: 5 }} />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }} >{(toBanglaNumber(item.number))}</Text>
                            <Spacing vertical={5} />
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }} >
                                <Text style={{ fontSize: 14, color: "#555" }} >{toBanglaNumber(item.quantity)} লিটার</Text>
                                <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: "#000" }} />
                                <Text style={{ fontSize: 14, color: "#555" }} >{moment(item.createdAt).fromNow()}</Text>
                            </View>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={<Spacing vertical={10} />}
                refreshing={loading}
                onRefresh={fetchVehicles}
                ListEmptyComponent={
                    loading ? 
                    <View style={{ alignItems: "center", flexDirection:'row', justifyContent: "center", marginTop: 120 }}>
                        <ActivityIndicator size="small" color="#000" />
                        <Spacing horizontal={10} />
                        <Text style={styles.noVehiclesText} >তথ্য লোড হচ্ছে...</Text>
                    </View>
                    :
                    <View style={{ alignItems: "center", marginTop: 120 }}>
                        <Text style={styles.noVehiclesText} >আপনি এখনো কোনো যানবাহনে জ্বালানি সরবরাহ কার্যক্রম শুরু করেননি</Text>
                        <Spacing vertical={20} />
                        <FullButton title="জ্বালানি সরবরাহ শুরু করুন" onPress={onPressStart} />
                    </View>
                }
            />

            <View style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
            }} >
                <FullButton title="জ্বালানি সরবরাহ শুরু করুন" onPress={onPressStart} />
            </View>
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