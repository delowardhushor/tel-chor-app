import { StyleSheet, Text, TouchableOpacity, TextInput, View } from "react-native";
import Spacing from "./Spacing";

export default function Input({label, ...props}) {

    return(
        <View>
            <Text style={styles.title}>{label}</Text>
            <Spacing vertical={10} />
            <TextInput 
                style={styles.btn} 
                {...props} 
            />
        </View>
    )

}

const styles = StyleSheet.create({

    btn:{
        borderColor:"#ddd",
        borderWidth: 1,
        borderRadius:5,
        height: 50,
        paddingHorizontal: 10,
        color:"#000",
    },
    title:{
        color:"#000",
        fontSize:16,
        fontWeight:"Bold",
    }

})