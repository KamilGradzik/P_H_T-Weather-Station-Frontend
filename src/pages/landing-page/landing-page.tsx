import React, { ReactElement, useContext } from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { OnChangeValue } from 'react-select';
import Select from 'react-select';
import mov from '../../assets/background.mp4'
import WeatherContext from '../../context/weather-context';
import { ACTIONS } from '../../utils/constants';
import "./landing-page.scss"
import City from '../../models/city';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = (): ReactElement => {
    const { cities, dispatch, selectedCity } = useContext(WeatherContext);
    const navigate = useNavigate();
    const [t] = useTranslation('common');

    const onCityChange = (selectedOption: OnChangeValue<City, false>) => {
        dispatch({type: ACTIONS.SET_SELECTED_CITY, value: selectedOption});
    };

    const handleClick  = async () => {
        navigate(`/${selectedCity?.id}` )
    }
    return (
        <div className='landing-page-container'>
            <video autoPlay loop muted>
                <source src={mov} type="video/mp4" />
            </video>
            <div className='content'>
                <div className='landing-page-modal'>
                    <span className="modal-title"><TiWeatherPartlySunny/>&nbsp;P.H.T<br/>Weather Station</span>
                    <div className="modal-content">
                        <h3><b>{t('mocks.welcomeTo')} <br/>{t('mocks.weatherStation')}</b></h3>
                        <span>{t('mocks.pleaseSelectCityFromMenuBelow')}</span>
                        <Select value={selectedCity}
                                options={cities}
                                onChange={onCityChange}
                                className={'react-select'}
                                classNamePrefix={'custom'}
                                placeholder={t('labels.select')}
                                menuPlacement="auto"
                        />
                        <button disabled={!selectedCity} onClick={()=>handleClick()}>{t('buttons.checkWeather')}</button>
                    </div>
                </div>
            </div>
            <span className="mov-credits">Free Broll by &nbsp;<a target="_blank" href="https://www.videezy.com/clouds/44293-clouds-moving-around-background">Videezy.com</a></span>
        </div>
    )
}
export default LandingPage