import { StyleSheet, View, Text } from "react-native";
import FullButton from "../components/FullBtn";
import InnerLayer from "../components/InnerLayer";

export default function Onboarding() {
    return (
        <InnerLayer>
            <View style={styles.container}>
                <FullButton title="Get Started" />
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