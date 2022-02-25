import axios, { AxiosRequestConfig } from 'axios';
import environment from '../environment';
import { CityReading } from '../models/city-reading';

const config: AxiosRequestConfig<any> = {
    method: 'GET'
}

export const getCities = () => axios.get(environment.apiURL + '/cities', config);
export const getCityReadings = (id: number) => axios.get(environment.apiURL + `/readings/${id}`, config);
export const getCityReadingsFromDate = (id: number, date: string) => axios.get<CityReading>(environment.apiURL + `/readings-date/${id}/${date}`, config);