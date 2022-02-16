import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app'
import WeatherContext from './context/weather-context';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import en from './assets/i18n/en/en.json';
import pl from './assets/i18n/pl/pl.json';

i18next.init({
    interpolation: {escapeValue: false},
    lng: 'en',
    resources: {
        en: {
            common: en
        },
        pl: {
            common: pl
        }
    }
})

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <WeatherContext.Provider value={null}>
                <App />
            </WeatherContext.Provider>
        </I18nextProvider>
    </React.StrictMode>,
  document.getElementById('root')
);