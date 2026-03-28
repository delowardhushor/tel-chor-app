import { StyleSheet, View, Text, FlatList, TouchableOpacity ,Image } from "react-native";
import InnerLayer from "../components/InnerLayer";
import { useDispatch, useSelector } from "react-redux";
import FullButton from "../components/FullBtn";
import React, { useEffect } from "react";
import Spacing from "../components/Spacing";
import { setSelectedLabel, setSelectedMetro } from "../store/appSlice";
import Input from "../components/Input";
import {captureImage} from './../utils/uti'
import axios from "axios";
import { Toast } from "toastify-react-native";
import moment from "moment";

export default function Addfuel({ navigation }) {
    const dispatch = useDispatch()
    const pump = useSelector(state => state.app.pump);
    const [vehicles, setVehicles] = React.useState([]);
    const [history, sethistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const selectedMetro = useSelector(state => state.app.selectedMetro);
    const selectedLabel = useSelector(state => state.app.selectedLabel);

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [quantity, setquantity] = React.useState("");
    const [number, setNumber] = React.useState("");


    const metros = [
        "ঢাকা মেট্রো",
        "চট্টগ্রাম মেট্রো",
        "খুলনা",
        "রাজশাহী",
        "সিলেট",
        "বরিশাল",
        "রংপুর",
        "ময়মনসিংহ",

        "কুমিল্লা",
        "ফেনী",
        "নোয়াখালী",
        "লক্ষ্মীপুর",
        "চাঁদপুর",
        "ব্রাহ্মণবাড়িয়া",

        "কক্সবাজার",
        "বান্দরবান",
        "খাগড়াছড়ি",
        "রাঙামাটি",

        "যশোর",
        "সাতক্ষীরা",
        "বাগেরহাট",
        "নড়াইল",
        "মাগুরা",
        "ঝিনাইদহ",
        "কুষ্টিয়া",
        "চুয়াডাঙ্গা",
        "মেহেরপুর",

        "বগুড়া",
        "পাবনা",
        "সিরাজগঞ্জ",
        "নাটোর",
        "নওগাঁ",
        "জয়পুরহাট",
        "চাঁপাইনবাবগঞ্জ",

        "দিনাজপুর",
        "ঠাকুরগাঁও",
        "পঞ্চগড়",
        "নীলফামারী",
        "লালমনিরহাট",
        "কুড়িগ্রাম",
        "গাইবান্ধা",

        "জামালপুর",
        "শেরপুর",
        "নেত্রকোনা",

        "গোপালগঞ্জ",
        "মাদারীপুর",
        "শরীয়তপুর",
        "ফরিদপুর",
        "রাজবাড়ী",

        "গাজীপুর",
        "নরসিংদী",
        "কিশোরগঞ্জ",
        "মানিকগঞ্জ",
        "মুন্সীগঞ্জ",
        "নারায়ণগঞ্জ",
        "টাঙ্গাইল",

        "ভোলা",
        "পটুয়াখালী",
        "পিরোজপুর",
        "ঝালকাঠি",

        "হবিগঞ্জ",
        "মৌলভীবাজার",
        "সুনামগঞ্জ"
    ];

    const vehicleCategoryLetters = [
        "ক",
        "খ",
        "গ",
        "ঘ",
        "চ",
        "ছ",
        "জ",
        "ঝ",
        "ট",
        "ঠ",
        "ড",
        "ন",
        "প",
        "ভ",
        "ম",
        "দ",
        "থ",
        "হ",
        "ল",
        "ই",
        "য"
    ];

    const addImage = async () => {
        const capturedImage = await captureImage();
        console.log("Selected image URI: ", capturedImage);
        if(capturedImage){
            setSelectedImage(capturedImage);
        }
    };

    const submit = async () => {
        if(!selectedMetro || !selectedLabel){
            // Show error message
            Toast.error("দয়া করে নাম্বার প্লেটের শহর এবং ক্যাটেগরি নির্বাচন করুন");
            return;
        }

        if(!selectedImage){
            Toast.error("দয়া করে নাম্বার প্লেটের ছবি তুলুন");
            return;
        }

        if(!quantity){
            Toast.error("দয়া করে তেলের পরিমাণ লিখুন");
            return;
        }

        setLoading(true);

        const formData = new FormData()

        formData.append("image", {
            uri: selectedImage.uri,
            type: 'image/'+selectedImage.fileName.split('.').pop(),
            name: selectedImage.fileName
        })

        const formatattedNUmberPlate = selectedMetro + "-" + selectedLabel + "-" + number;

        formData.append("quantity", quantity);
        formData.append("number", formatattedNUmberPlate);
        formData.append("filledFrom", pump._id);

        try {
            const res = await axios.post(`https://telchorapi.bitbytetec.com/vehicles`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res?.data?.success) {
                navigation.goBack();
                Toast.success("তেল সরবরাহ সফলভাবে যোগ করা হয়েছে");
            }
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    }

    const checkFuel = async () => {

        // todo:: fetch fuel supply history based on selected metro, label and number
        try {            const res = await axios.get(`https://telchorapi.bitbytetec.com/vehicles/pump/${pump._id}`);
            if (res?.data?.success) {
                sethistory(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    }

    useEffect(() => {
        checkFuel();
    }, [selectedLabel, selectedMetro, number])

    return (
        <InnerLayer>
            <View style={styles.header}>
                <Text style={styles.pumpName} >জ্বালানি সরবরাহ শুরু করুন</Text>
            </View>
            <Spacing vertical={20} />
            <View style={{flex: 1}} >
                <Text style={styles.label} >নাম্বার প্লেটের শহর নির্বাচন করুন</Text>
                <Spacing vertical={10} />
                <FlatList
                    style={{maxHeight: 40}}
                    data={metros}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: selectedMetro === item ? "#000" : "#fff",
                            borderRadius: 5,
                            marginRight: 10,
                            borderColor: "#eee",
                            borderWidth: 1,
                        }} 
                        onPress={() => dispatch(setSelectedMetro(item))}
                        >
                            <Text style={{ color: selectedMetro === item ? "#fff" : "#000" }} >{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <Spacing vertical={20} />
                <Text style={styles.label} >যানবাহনের ক্যাটেগরি নির্বাচন করুন</Text>
                <Spacing vertical={10} />
                <FlatList
                    data={vehicleCategoryLetters}
                    style={{maxHeight: 40}}

                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{
                            padding: 10,
                            paddingHorizontal: 15,
                            backgroundColor: selectedLabel === item ? "#000" : "#fff",
                            borderRadius: 5,
                            marginRight: 10,
                            borderColor: "#eee",
                            borderWidth: 1,
                        }} 
                        onPress={() => dispatch(setSelectedLabel(item))}
                        >
                            <Text style={{ color: selectedLabel === item ? "#fff" : "#000" }} >{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <Spacing vertical={20} />
                <Input label={"যানবাহনের নাম্বার প্লেটের ডিজিট"} keyboardType="numeric" onChangeText={setNumber} />
                {history.length > 0 &&
                    <>
                        <Spacing vertical={20} />
                        <View style={{
                            padding: 10,
                            backgroundColor: "lightyellow",
                            borderRadius: 5,
                            borderColor: "#eee",
                            borderWidth: 1,
                        }} >
                        <Text style={{ fontSize: 12, fontWeight: "bold" }} >{history[0].number} নাম্বার প্লেটের যানবাহনটি {moment(history[0].createdAt).fromNow()} {history[0].filledFrom?.name}, {history[0].filledFrom?.location} থেকে {history[0].quantity} লিটার জ্বালানি ক্রয় করেছে </Text>
                        </View>
                        </>
                        }
                <Spacing vertical={20} />
                <Input label={"তেলের পরিমাণ (লিটারে) লিখুন"} keyboardType="numeric" onChangeText={setquantity} />
                
                <Spacing vertical={20} />
                {selectedImage?.uri ? 
                <View style={{alignItems:"center"}} >
                    <Image source={{uri: selectedImage?.uri}} style={{width: 150, height: 150, borderRadius: 10}} />
                    <Spacing vertical={10} />
                    <FullButton title="নাম্বার প্লেটের ছবি পরিবর্তন করুন" onPress={addImage} />
                </View>
            :
                <FullButton title="নাম্বার প্লেটের ছবি তুলুন (প্রমাণসাপেক্ষে)" onPress={addImage} />}
            </View>
            <TouchableOpacity style={{
                backgroundColor: "#222",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                height: 50,
                marginTop: 20
            }} onPress={submit} >
                <Text style={{ color: "#fff", fontWeight: "600" }} >সম্পূর্ণ করুন</Text>
            </TouchableOpacity>
        </InnerLayer>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColorL: "#eee",
        borderBottomWidth: 0.5,
        paddingBottom: 10,
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
    },
    label: {
        fontSize: 16,
        color: "#555",
        fontWeight: '600'
    }
});