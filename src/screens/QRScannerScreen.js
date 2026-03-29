import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { useDispatch } from 'react-redux';
import { Toast } from 'toastify-react-native';
import { setSelectedLabel, setSelectedMetro, setSelectedNumber } from '../store/appSlice';

const QRScannerScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    function parseVehicleNumber(input) {
  // Regex breakdown:
  // ^(.+?)-([ক-হ])-(\d{1,3}-\d{1,4})$
  // (.+?)      => city name (lazy match)
  // ([ক-হ])    => vehicle type letter (Bangla consonants)
  // (\d{1,3}-\d{1,4}) => number part (e.g., ২২-২২২২)
  
  const regex = /^(.+?)-([ক-হ])-([\d০-৯]{1,3}-[\d০-৯]{1,4})$/;
  const match = input.match(regex);

  if (!match) {
    return null; // invalid format
  }

  return {
    city: match[1],
    vehicleType: match[2],
    number: match[3],
  };
}

    const onReadCode = (event) => {
        if (event.nativeEvent.codeStringValue) {

            const parsed = parseVehicleNumber(event.nativeEvent.codeStringValue);

            if (!parsed) {
                Toast.error("অবৈধ QR কোড: এই QR কোডটি বৈধ নাম্বার প্লেটের ফরম্যাটে নেই।");
                return;
            }

            dispatch(setSelectedLabel(parsed.vehicleType))
            dispatch(setSelectedNumber(parsed.number))
            dispatch(setSelectedMetro(parsed.city))

            navigation.goBack();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                // Barcode props
                scanBarcode={true}
                onReadCode={onReadCode} // optional
                showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                laserColor='red' // (default red) optional, color of laser in scanner frame
                frameColor='white' // (default white) optional, color of border of scanner frame
                style={{
                    height: 400
                }}
            />
        </View>
    );
};

export default QRScannerScreen;