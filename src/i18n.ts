import i18next from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
.use(initReactI18next)
.use(i18nextBrowserLanguagedetector)
.init({
  fallbackLng: "en",
  resources: {
    en: {
        translation: {
            balance: 'Coin balance',
            coinSearch: 'Coin search',
            price: 'Coin price in cents',
            buy: 'Buy'
        }
    },
    ru: {
        translation: {
            balance: 'Баланс монет',
            coinSearch: 'Поиск по монете',
            price: 'Цена монеты в центах',
            buy: 'Купить'
        }
    }
  }
});
