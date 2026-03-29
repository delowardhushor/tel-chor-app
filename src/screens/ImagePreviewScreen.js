import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@react-native-vector-icons/ionicons";

const ImagePreviewScreen = ({ route, navigation }) => {
  const { image } = route.params; // image URL or local path

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Full Screen Image */}
      <Image
        source={
          typeof image === 'string'
            ? { uri: image }
            : image
        }
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default ImagePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
  },
});