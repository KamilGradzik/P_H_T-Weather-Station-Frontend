import React, { useReducer } from 'react';
import City from '../models/city';
import { Sensor } from '../models/sensor';
import { Language } from '../models/language';
import { CityReading } from '../models/city-reading';
import { getCities, getCityReadingsFromDate } from '../services/cities.service';
import { AxiosResponse } from 'axios';
import { getSensors } from '../services/sensors.service';
import weatherReducer from '../reducers/weather-reducer';
import { ACTIONS } from '../utils/constants';
import moment from 'moment';
import 'moment-timezone';

const WeatherContext: React.Context<any> = React.createContext('test');

// @ts-ignore
WeatherContext.Provider = ( Provider => (props: any)  => {
    const { children } = props || {};
    const languages: Language[] = [
        {
            id: 1,
            label: 'Polski',
            value: 'Polski',
            code: 'pl-pl'
        },
        {
            id: 2,
            label: 'English',
            value: 'English',
            code: 'en-gb'
        }
    ];

    const [state, dispatch] = useReducer(weatherReducer, {
        cities: [] as City[],
        sensors: [] as Sensor[],
        readings: [] as CityReading[],
        selectedCity: null as City,
        selectedSensor: null as Sensor,
        selectedLanguage: null as Language
    }, () => {
        getCities()
            .then((res: AxiosResponse<City[]>) => res.data)
            .then((data) => {
                const cities = data.map((x: City) =>  {return {...x, label: x.city_name, value: x.id}})
                dispatch({type: ACTIONS.SET_CITIES, value: cities})
            })
            .catch((err: any) => console.log(err));

        getSensors()
            .then((res: AxiosResponse<Sensor[]>) => res.data)
            .then((data) => {
                dispatch({type: ACTIONS.SET_SENSORS, value: data})
            })
            .catch((err: any) => console.log(err));
    });

    const getReadingsFromDate = (id: number, numberOfCalls = 1, intervalInMin = 60, date: string | null = null) => {
        const currDate = !date ? moment().utc() : moment(date);
        const time = currDate.format(!date ? 'HH' : 'HH:mm');
        const combinedDate = moment(currDate.format('YYYY-MM-DD') + `T${!date ? time + ':00' : time}:00Z`).utc();

        const readingsPromiseArray: Promise<AxiosResponse<CityReading, any>>[] = [];

        for (let i = 0; i < numberOfCalls; i++) {
            const date = i ? combinedDate.subtract(intervalInMin, 'minutes').format() : combinedDate.format();
            readingsPromiseArray.push(getCityReadingsFromDate(id, date)
                    .then((res: AxiosResponse<CityReading>) => {
                        return {...res.data, date: date};
                    })
                    .catch(err => err))
        }

        return readingsPromiseArray;
    }

    return <Provider
        value={{
            ...state,
            dispatch,
            languages,
            getReadingsFromDate
        }}>
        { children }
    </Provider>;
})(WeatherContext.Provider)

export default WeatherContext;