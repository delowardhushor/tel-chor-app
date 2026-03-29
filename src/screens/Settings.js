import { StyleSheet, View, Text } from "react-native";
import FullButton from "../components/FullBtn";
import InnerLayer from "../components/InnerLayer";
import Spacing from "../components/Spacing";
import { useDispatch } from "react-redux";
import { setUserType, UpdatePump } from "../store/appSlice";

export default function Onboarding({navigation}) {

    const dispatch = useDispatch()

    const handlePumpOperatorPress = () => {
        dispatch(UpdatePump(null));
        dispatch(setUserType(""))
    }

    return (
        <InnerLayer>
            <View style={styles.container}>
                <FullButton title={"পাম্প প্যানেল থেকে বের হয়ে যান"} onPress={handlePumpOperatorPress} />
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