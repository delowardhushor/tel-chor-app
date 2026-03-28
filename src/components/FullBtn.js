import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function FullButton({title, onPress}) {

    return(
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.title} >{title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    btn:{
        backgroundColor:"#222",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        height: 50,
        paddingHorizontal: 15
    },
    title:{
        color:"#fff",
        fontSize:16,
        fontWeight:"SemiBold",
    }

})