import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Spacing({horizontal = 0, vertical = 0}) {

    return(
        <View style={{width: horizontal, height: vertical}} />
    )

}
