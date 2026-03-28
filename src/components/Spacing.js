import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Spacing({horizontal = 15, vertical = 15}) {

    return(
        <View style={{width: horizontal, height: vertical}} />
    )

}
