import i18n from '../i18n';
import { store } from '../store/store';
import { setLanguage } from '../store/appSlice';

export const changeLanguage = async (language) => {
  try {
    await i18n.changeLanguage(language);
    store.dispatch(setLanguage(language));
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export const getCurrentLanguage = () => {
  return i18n.language;
};