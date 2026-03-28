import { StyleSheet, View, Text } from "react-native";
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
});