import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { changeLanguage } from '../utils/languageUtils';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.app.language);

  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common.language')}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            currentLanguage === 'en' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageChange('en')}
        >
          <Text style={styles.buttonText}>{t('common.english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            currentLanguage === 'bn' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageChange('bn')}
        >
          <Text style={styles.buttonText}>{t('common.bengali')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default LanguageSelector;