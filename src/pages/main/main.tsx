import React, { ReactElement, useContext, useEffect, useState } from 'react';
import "./main.scss";
import WeatherContext from '../../context/weather-context';
import Navbar from '../../components/navbar/navbar';
import { useParams } from 'react-router';
import CityReadingsModal from '../../components/city-readings-modal/city-readings-modal';
import City from '../../models/city';
import { ACTIONS } from '../../utils/constants';
import WeatherReadingTile from '../../components/weather-readings-tile/weather-readings-tile';
import { CityReading } from '../../models/city-reading';
import { useTranslation } from 'react-i18next';

const Main:React.FC<{showLoader: boolean}> = (props): ReactElement => {
    const { dispatch, cities, selectedCity, getReadingsFromDate, readings } = useContext(WeatherContext);
    const [selectedReading, setSelectedReading] = useState<CityReading | null>(null)
    const [showModal, setShowModal] = useState(false);
    const [t] = useTranslation('common');
    const params = useParams();

    useEffect(() => {
        const find = cities?.find((x: City) => +params?.id === x.id);
        if (find && (!selectedCity || selectedCity.id !== +params.id)) {
            dispatch({type: ACTIONS.SET_SELECTED_CITY, value: find})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities]);

    useEffect(() => {
        if (selectedCity) {
            dispatch({type: ACTIONS.SET_READINGS, value: []})

            Promise.all(getReadingsFromDate(selectedCity.id, 3)).then(value => {
                value?.forEach((reading: any) => {
                    console.log(reading);
                    reading.pollution = Math.abs(+reading.pollution) * 10;
                    dispatch({type: ACTIONS.ADD_READING, value: reading})
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    const onReadingClick = (reading: CityReading) => {
        setSelectedReading(reading);
        setShowModal(true);
    }

    return (
        <>
        <div className="main-container">
            <Navbar />
            {!readings?.length && !props.showLoader ?
                <div className="no-items">
                    <span className='no-items-message'>{t('mocks.dataNotFoundForSpecifiedCity')}!</span>
                    <span className='no-items-message'>{t('mocks.perhapsTheCityDoesntExists')}.</span>
                </div>
                :
                <div className="readings-container">
                    {readings.map((reading: any, i: number) => {
                        return  <div key={i} className="reading" onClick={() => onReadingClick(reading)} >
                            <WeatherReadingTile  {...reading} />
                        </div>
                    })}
                </div>
            }
        </div>
            {showModal && <CityReadingsModal {...selectedReading } getReadingsFromDate={getReadingsFromDate} setShowModal={setShowModal} selectedCity={selectedCity}/>}
        </>

    );
}

export default Main;