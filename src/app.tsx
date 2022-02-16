import React, { useContext, useEffect, useState } from 'react';
import './app.scss'
import Main from './pages/main/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from './pages/landing-page/landing-page';
import axios from 'axios';
import Loader from './components/loader/loader';
import { useCookies } from 'react-cookie';
import WeatherContext from './context/weather-context';
import { ACTIONS } from './utils/constants';
import { Language } from './models/language';
import { useTranslation } from 'react-i18next';


const App: React.FC = () => {
    const [showLoader, setShowLoader] = useState(false)
    const { selectedLanguage, dispatch, languages } = useContext(WeatherContext);
    const [cookies, setCookies] = useCookies(['language'])
    const [_, i18n] = useTranslation('common');
    let requestCount = 0;

    useEffect(() => {
        if (!cookies?.language && !selectedLanguage) {
            setCookies('language', languages[0].code);
            dispatch({type: ACTIONS.SET_LANGUAGE, value: languages[0]});
        } else if (cookies.language && cookies.language !== selectedLanguage?.code) {
            const findLang = languages.find((l: Language) => l.code === cookies.language);
            findLang ? dispatch({type: ACTIONS.SET_LANGUAGE, value: findLang}) : dispatch({type: ACTIONS.SET_LANGUAGE, value: languages[0]});
        }
    }, [])

    useEffect(() => {
        if (selectedLanguage) {
            selectedLanguage.code !== cookies.language && setCookies('language', selectedLanguage.code);
            if (i18n.language !== selectedLanguage.code.substr(0, 2)) {
                i18n.changeLanguage(selectedLanguage.code.substr(0, 2))
            }
        }
    }, [selectedLanguage])

    axios.interceptors.request.use((request) => {
        requestCount++;
        setShowLoader(true);
        return request
    }, error => {
        console.log(error);
        return Promise.reject(error);
    })
    axios.interceptors.response.use((response) => {
        requestCount--;
        if (!requestCount) setShowLoader(false);
        return response
    }, error => {
        requestCount--;
        if (!requestCount) setShowLoader(false);
        return Promise.reject(error);
    })

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/:id" element={<Main showLoader={showLoader}/>} />
                </Routes>
            </div>
            <Loader showLoader={showLoader}/>
        </Router>
    )
}

export default App;