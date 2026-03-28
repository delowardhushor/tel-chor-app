import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export const IMAGE_BASE_URL = "https://telchorapi.bitbytetec.com/";

/**
 * Capture an image using camera
 * @returns {Promise<string|null>} - Returns the image URI or null if cancelled/error
 */
export async function captureImage() {
  try {
    // Android: Request camera permission at runtime
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
        return null;
      }
    }

    // Launch the camera
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      saveToPhotos: true, // saves captured image to gallery
    };

    return new Promise((resolve) => {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
          resolve(null);
        } else if (response.errorCode) {
          console.log('Camera Error:', response.errorMessage);
          resolve(null);
        } else {
          // Image captured successfully
          const file = response.assets[0];
          resolve(file);
        }
      });
    });
  } catch (error) {
    console.log('Capture Image Error:', error);
    return null;
  }
}