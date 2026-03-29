import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import InnerLayer from "../components/InnerLayer";
import { useDispatch, useSelector } from "react-redux";
import FullButton from "../components/FullBtn";
import React, { useEffect } from "react";
import Spacing from "../components/Spacing";
import { setSelectedLabel, setSelectedMetro, setSelectedNumber, setSelectedTab } from "../store/appSlice";
import Input from "../components/Input";
import { captureImage, IMAGE_BASE_URL, metros, toBanglaNumber, vehicleCategoryLetters } from './../utils/uti'
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
    const selectedTab = useSelector(state => state.app.selectedTab);
    const selectedNumber = useSelector(state => state.app.selectedNumber);

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [quantity, setquantity] = React.useState("");    

    const addImage = async () => {
        const capturedImage = await captureImage();
        console.log("Selected image URI: ", capturedImage);
        if (capturedImage) {
            setSelectedImage(capturedImage);
        }
    };

    const handleChange = (text) => {
        // Remove all non-digits
        let digits = text.replace(/\D/g, '');

        // Limit to 6 digits
        digits = digits.slice(0, 6);

        // Add dash after 2 digits
        if (digits.length > 2) {
            digits = digits.slice(0, 2) + '-' + digits.slice(2);
        }

        dispatch(setSelectedNumber(digits));
    };

    const getFormattedNumberPlate = () => {
        let formatattedNUmberPlate = selectedMetro + "-" + selectedLabel + "-" + selectedNumber;

        formatattedNUmberPlate = toBanglaNumber(formatattedNUmberPlate.replace(/\s+/g, '-'));
        return formatattedNUmberPlate;

    }

    const submit = async () => {
        if (!selectedMetro || !selectedLabel) {
            // Show error message
            Toast.error("দয়া করে নাম্বার প্লেটের শহর এবং ক্যাটেগরি নির্বাচন করুন");
            return;
        }

        if (!selectedImage) {
            Toast.error("দয়া করে নাম্বার প্লেটের ছবি তুলুন");
            return;
        }

        if (!quantity) {
            Toast.error("দয়া করে তেলের পরিমাণ লিখুন");
            return;
        }

        if (selectedNumber.length < 7) {
            Toast.error("দয়া করে নাম্বার প্লেটের ৬ ডিজিট লিখুন");
            return;
        }

        setLoading(true);

        const formData = new FormData()

        formData.append("image", {
            uri: selectedImage.uri,
            type: 'image/' + selectedImage.fileName.split('.').pop(),
            name: selectedImage.fileName
        })

        formData.append("quantity", quantity);
        formData.append("number", getFormattedNumberPlate());
        formData.append("filledFrom", pump._id);

        try {
            const res = await axios.post(`https://telchorapi.bitbytetec.com/vehicles`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res?.data?.success) {
                dispatch(setSelectedLabel(null));
                dispatch(setSelectedMetro(null));
                dispatch(setSelectedNumber(null));
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
        try {
            const res = await axios.get(`https://telchorapi.bitbytetec.com/vehicles/bynumber?number=${getFormattedNumberPlate()}`);
            console.log("Fuel supply history response:", res.data);
            if (res?.data?.success && res.data.data.length > 0) {
                sethistory(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    }

    useEffect(() => {
        if (selectedLabel && selectedMetro && selectedNumber?.length >= 7) {
            checkFuel();

        } else {
            sethistory([]);
        }
    }, [selectedLabel, selectedMetro, selectedNumber])

    return (
        <InnerLayer>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderBottomColor: "#000",
                borderBottomWidth: 1,
            }} >
                <FullButton 
                    title="ম্যানুয়ালি নাম্বার দিন"
                    onPress={() => dispatch(setSelectedTab("menual"))}
                    style={{
                        backgroundColor: !selectedTab || selectedTab === "menual" ? "#000" : "#fff",
                        flex: 1,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    titleStyle={{
                        color: selectedTab === "menual" ? "#fff" : "#000",
                    }}
                />
                <FullButton 
                    title="QR স্ক্যান করুন"
                    onPress={() => dispatch(setSelectedTab("qr"))}
                    style={{
                        backgroundColor: selectedTab === "qr" ? "#000" : "#fff",
                        flex: 1,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,

                    }}
                    titleStyle={{
                        color: selectedTab === "qr" ? "#fff" : "#000",
                    }}
                />
            </View>
            <Spacing vertical={20} />
            <ScrollView >
                {selectedTab === "qr" ?
                <>
                {selectedLabel && selectedMetro && selectedNumber ? 
                <>
                    <Text style={{fontSize: 16, color: '#000', fontWeight:'600', textAlign:'center'}} >স্ক্যান করা যানবাহনের নাম্বার</Text>
                    <Text style={{fontSize: 28, color: '#000', textAlign:'center', fontWeight:'900'}} >{getFormattedNumberPlate()}</Text>

                    <Spacing vertical={5} />


<View style={{
                            padding: 10,
                            backgroundColor: "lightyellow",
                            borderRadius: 5,
                            borderColor: "#eee",
                            borderWidth: 1,
                            alignItems: "center",
                            maxWidth: "70%",
                            alignSelf: "center",
                        }} >
                    <Text style={{fontSize: 14, color: '#000', textAlign:'center', }} >দয়া করে স্ক্যান করে পাওয়া নাম্বারের যানবাহনের মূল নাম্বারটি মিলিয়ে নিন</Text>
                    </View>

                    <Spacing vertical={20} />

                    <FullButton 
                        title="নতুন করে QR কোড স্ক্যান করুন"
                        onPress={() => navigation.navigate("QRScannerScreen")}
                        style={{alignSelf:'center'}}
                        />

                </>
                : 
                <FullButton 
                        title="QR কোড স্ক্যান করুন"
                        onPress={() => navigation.navigate("QRScannerScreen")}
                        />
                }
                    
                </>
                :
                <>
                    <Text style={styles.label} >নাম্বার প্লেটের শহর নির্বাচন করুন</Text>
                    <Spacing vertical={10} />
                    <FlatList
                        style={{ maxHeight: 40 }}
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
                        style={{ maxHeight: 40 }}

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
                    <Input
                        label={"যানবাহনের নাম্বার প্লেটের ডিজিট"}
                        keyboardType="numeric"
                        onChangeText={handleChange}
                        placeholder={"নাম্বার লিখুন (যেমন: ৮৯-২২৩৩)"}
                        value={selectedNumber}
                    />
                </>
                }
                {history.length > 0 &&
                    <>
                        <Spacing vertical={20} />
                        <View style={{
                            padding: 10,
                            backgroundColor: "lightyellow",
                            borderRadius: 5,
                            borderColor: "#eee",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ImagePreviewScreen", { image: IMAGE_BASE_URL + history[0].image })}
                            >
<Image 
                                source={{ uri: IMAGE_BASE_URL + history[0].image }}
                                style={{ width: 80, height: 80, borderRadius: 5, marginBottom: 10 }}
                            />
                            </TouchableOpacity>
                            
                            <Text style={{flex:1, fontSize: 12, fontWeight: "bold" }} >{history[0].number} নাম্বার প্লেটের যানবাহনটি {moment(history[0].createdAt).fromNow()} {history[0].filledFrom?.name}, {history[0].filledFrom?.location} থেকে {history[0].quantity} লিটার জ্বালানি ক্রয় করেছে </Text>
                        </View>
                    </>
                }
                <Spacing vertical={20} />
                <Input label={"তেলের পরিমাণ (লিটারে) লিখুন"} keyboardType="numeric" onChangeText={setquantity} />

                <Spacing vertical={20} />
                {selectedImage?.uri ?
                    <View style={{ alignItems: "center" }} >
                        <Image source={{ uri: selectedImage?.uri }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                        <Spacing vertical={10} />
                        <FullButton title="আবার তুলুন" onPress={addImage} />
                    </View>
                    :
                    <FullButton title="নাম্বার প্লেটের ছবি তুলুন (প্রমাণসাপেক্ষে)" onPress={addImage} />}
            </ScrollView>
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