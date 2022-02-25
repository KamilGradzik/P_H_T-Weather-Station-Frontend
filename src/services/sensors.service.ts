import axios, { AxiosRequestConfig } from 'axios';
import environment from '../environment';

const config: AxiosRequestConfig<any> = {
    method: 'GET'
}
export const getSensors = () => axios.get(environment.apiURL + '/sensors', config);