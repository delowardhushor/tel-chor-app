import { StyleSheet, View, Text, FlatList , TouchableOpacity} from "react-native";
import FullButton from "../components/FullBtn";
import Input from "../components/Input";
import InnerLayer from "../components/InnerLayer";
import Spacing from "../components/Spacing";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLabel, setSelectedMetro, setUserType, setVehicle, UpdatePump } from "../store/appSlice";
import axios from "axios";
import React from "react";
import { metros, toBanglaNumber, vehicleCategoryLetters } from "../utils/uti";
import { Toast } from "toastify-react-native";

export default function VehicleSignUp({ navigation }) {

    const dispatch = useDispatch();
    
    const pump = useSelector(state => state.app.pump);
    const [vehicles, setVehicles] = React.useState([]);
    const [history, sethistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const selectedMetro = useSelector(state => state.app.selectedMetro);
    const selectedLabel = useSelector(state => state.app.selectedLabel);

    const [quantity, setquantity] = React.useState("");
    const [number, setNumber] = React.useState("");


     const handleChange = (text) => {
        // Remove all non-digits
        let digits = text.replace(/\D/g, '');

        // Limit to 6 digits
        digits = digits.slice(0, 6);

        // Add dash after 2 digits
        if (digits.length > 2) {
            digits = digits.slice(0, 2) + '-' + digits.slice(2);
        }

        setNumber(digits);
    };

    const getFormattedNumberPlate = () => {
            let formatattedNUmberPlate = selectedMetro + "-" + selectedLabel + "-" + number;
    
            formatattedNUmberPlate = toBanglaNumber(formatattedNUmberPlate.replace(/\s+/g, '-'));
            return formatattedNUmberPlate;
    
        }


    const submit = async () => {
        if (!selectedMetro || !selectedLabel) {
                    // Show error message
                    Toast.error("দয়া করে নাম্বার প্লেটের শহর এবং ক্যাটেগরি নির্বাচন করুন");
                    return;
                }
        
                if (number.length < 7) {
                    Toast.error("দয়া করে নাম্বার প্লেটের ৬ ডিজিট লিখুন");
                    return;
                }

        const numberPlate = getFormattedNumberPlate();

        dispatch(setVehicle(numberPlate));
        dispatch(setUserType("vehicle"));
                

    }

    return (
        <InnerLayer>
            <View style={{ flex: 1 }} >
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
                                value={number}
                            />
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
    container: {
        flex: 1,
        justifyContent: 'center',

    },
});