import './navbar.scss'
import React, { useContext, useState } from 'react';
import WeatherContext from '../../context/weather-context';
import City from '../../models/city';
import { ACTIONS } from '../../utils/constants';
import Select, { OnChangeValue } from 'react-select';
import { FaEllipsisV } from 'react-icons/fa';
import { Language } from '../../models/language';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
    const { cities, dispatch, languages, selectedCity, selectedLanguage } = useContext(WeatherContext);
    const [shown, setShown] = useState(false);
    const navigate = useNavigate();
    const [t] = useTranslation('common');

    const onCityChange = (selectedOption: OnChangeValue<City, false>) => {
        navigate(`/${selectedOption?.id}` )
        dispatch({type: ACTIONS.SET_SELECTED_CITY, value: selectedOption});
    };

    const onLanguageChange = (selectedOption: OnChangeValue<Language, false>) => {
        dispatch({type: ACTIONS.SET_LANGUAGE, value: selectedOption});
    };

    return(
        <header>
            <div className='navbar'>
                <div className="select-wrapper city">
                    <label>{t('labels.city')}</label>
                    <Select value={selectedCity}
                            options={cities}
                            onChange={onCityChange}
                            menuPlacement={'bottom'}
                            className={'react-select'}
                            classNamePrefix={'custom'}
                            placeholder={t('mocks.selectCity')}
                    />
                </div>
                <div className='title'><span>P H T</span></div>
                <div className="select-wrapper language">
                    <label>{t('labels.language')}</label>
                    <Select value={selectedLanguage}
                            options={languages}
                            onChange={onLanguageChange}
                            menuPlacement={'bottom'}
                            className={'react-select'}
                            classNamePrefix={'custom'}
                            placeholder={t('mocks.selectLanguage')}
                    />
                </div>
            </div>
            <div className='navbar-mobile'>
                <div className={shown ? "mobile-dropdowns" : "mobile-dropdowns hidden-dropdowns"}>
                    <div className="select-wrapper-mobile city">
                        <label>{t('labels.city')}</label>
                        <Select value={selectedCity}
                                options={cities}
                                onChange={onCityChange}
                                menuPlacement={'bottom'}
                                className={'react-select'}
                                classNamePrefix={'custom'}
                                menuPortalTarget={document.body}
                                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                placeholder={t('mocks.selectCity')} />
                    </div>
                    <div className="select-wrapper-mobile language">
                        <label>{t('labels.language')}</label>
                        <Select value={selectedLanguage}
                                options={languages}
                                onChange={onLanguageChange}
                                menuPlacement={'bottom'}
                                className={'react-select'}
                                classNamePrefix={'custom'}
                                menuPortalTarget={document.body}
                                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                placeholder={t('mocks.selectLanguage')}
                        />
                    </div>
                </div>
                <div className='title-mobile'><span className='title-text'>P H T</span><span className="open-menu" onClick={()=>setShown(!shown)}><FaEllipsisV/></span></div>
            </div>
        </header>
    )
};

export default Navbar;