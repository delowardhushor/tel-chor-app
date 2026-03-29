import { StyleSheet, View, Text, Image } from "react-native";
import FullButton from "../components/FullBtn";
import InnerLayer from "../components/InnerLayer";
import Spacing from "../components/Spacing";
import { useDispatch } from "react-redux";
import { UpdatePump } from "../store/appSlice";

export default function Onboarding({navigation}) {

    const handlePumpOperatorPress = () => {
        navigation.navigate('PumpSignUp');
    }

    const handleGeneralUserPress = () => {
        navigation.navigate('GeneralUserLogin');
    }


    return (
        <InnerLayer>
            <View style={styles.container}>

                <Image
                    source={require('../images/logo.png')}
                    style={{ width: 200, height: 200, marginBottom: 10, alignSelf: 'center' }}
                />

                <Text style={styles.description} >
                    তেলচোর অ্যাপে আপনাকে স্বাগতম। এই অ্যাপের মূল উদ্দেশ্য হলো প্যানিক বাইং এবং অতিরিক্ত তেল ক্রয় রোধ করা।
                </Text>

                <FullButton title={"আমি পাম্প অপারেটর"} onPress={handlePumpOperatorPress} />
                <Spacing vertical={20} />
                <FullButton title={"আমি সাধারণ ইউজার"} onPress={handleGeneralUserPress} />
            </View>
        </InnerLayer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 80,
        paddingHorizontal: 20,
    },
});