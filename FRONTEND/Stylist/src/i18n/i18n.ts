import i18next from 'i18next';
import viLanguage from 'i18n/vi.json';
import enLanguage from 'i18n/en.json';

const en = { translation: enLanguage };
const vi = { translation: viLanguage };

//CONFIG TRANSPLATION LANGUAGE
// const languageId = parseInt(localStorage.getItem(LocalStorageKey.LANGUAGE) || 'vi');
// const languageName = Languages.find((l) => l.id === languageId)?.shortName;
i18next.init({
  lng: 'vi',
  fallbackLng: 'vi',
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  backend: {
    loadPath: '/i18n/{{lng}}.json',
  },
  resources: { en, vi },
});

export default i18next;
