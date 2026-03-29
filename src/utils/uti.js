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

export const toBanglaNumber = (input) => {
  const eng = '0123456789';
  const ban = '০১২৩৪৫৬৭৮৯';

  return input
    .toString()

    // Step 1: convert Bangla → English (normalize)
    .replace(/[০-৯]/g, d => eng['০১২৩৪৫৬৭৮৯'.indexOf(d)])

    // Step 2: convert English → Bangla (final output)
    .replace(/[0-9]/g, d => ban[eng.indexOf(d)]);
};

export const metros = [
        "ঢাকা মেট্রো",
        "চট্টগ্রাম মেট্রো",
        "খুলনা",
        "রাজশাহী",
        "সিলেট",
        "বরিশাল",
        "রংপুর",
        "ময়মনসিংহ",

        "কুমিল্লা",
        "ফেনী",
        "নোয়াখালী",
        "লক্ষ্মীপুর",
        "চাঁদপুর",
        "ব্রাহ্মণবাড়িয়া",

        "কক্সবাজার",
        "বান্দরবান",
        "খাগড়াছড়ি",
        "রাঙামাটি",

        "যশোর",
        "সাতক্ষীরা",
        "বাগেরহাট",
        "নড়াইল",
        "মাগুরা",
        "ঝিনাইদহ",
        "কুষ্টিয়া",
        "চুয়াডাঙ্গা",
        "মেহেরপুর",

        "বগুড়া",
        "পাবনা",
        "সিরাজগঞ্জ",
        "নাটোর",
        "নওগাঁ",
        "জয়পুরহাট",
        "চাঁপাইনবাবগঞ্জ",

        "দিনাজপুর",
        "ঠাকুরগাঁও",
        "পঞ্চগড়",
        "নীলফামারী",
        "লালমনিরহাট",
        "কুড়িগ্রাম",
        "গাইবান্ধা",

        "জামালপুর",
        "শেরপুর",
        "নেত্রকোনা",

        "গোপালগঞ্জ",
        "মাদারীপুর",
        "শরীয়তপুর",
        "ফরিদপুর",
        "রাজবাড়ী",

        "গাজীপুর",
        "নরসিংদী",
        "কিশোরগঞ্জ",
        "মানিকগঞ্জ",
        "মুন্সীগঞ্জ",
        "নারায়ণগঞ্জ",
        "টাঙ্গাইল",

        "ভোলা",
        "পটুয়াখালী",
        "পিরোজপুর",
        "ঝালকাঠি",

        "হবিগঞ্জ",
        "মৌলভীবাজার",
        "সুনামগঞ্জ"
    ];

  export  const vehicleCategoryLetters = [
        "ক",
        "খ",
        "গ",
        "ঘ",
        "চ",
        "ছ",
        "জ",
        "ঝ",
        "ট",
        "ঠ",
        "ড",
        "ন",
        "প",
        "ভ",
        "ম",
        "দ",
        "থ",
        "হ",
        "ল",
        "ই",
        "য"
    ];