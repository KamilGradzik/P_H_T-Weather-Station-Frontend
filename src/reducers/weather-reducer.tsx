import { ACTIONS } from '../utils/constants';
import moment from 'moment';

const weatherReducer = (state: any, action:any) => {
    switch (action.type) {
        case ACTIONS.SET_CITIES: {
            return { ...state, cities: action.value }
        }
        case ACTIONS.SET_SENSORS: {
            return { ...state, sensors: action.value }
        }
        case ACTIONS.SET_READINGS: {
            return { ...state, readings: action.value }
        }
        case ACTIONS.ADD_READING: {
            action.value = {
                ...action.value,
                date: moment.utc(action.value.date).local().format()
            }

            const readings = [...state.readings, action.value]?.sort((a,b) => moment.utc(a.date).diff(moment.utc(b.date)));
            return {...state, readings: readings}
        }
        case ACTIONS.SET_SELECTED_CITY: {
            return { ...state, selectedCity: action.value }
        }
        case ACTIONS.SET_SELECTED_SENSORS: {
            return { ...state, selectedSensors: action.value }
        }
        case ACTIONS.SET_LANGUAGE: {
            return {...state, selectedLanguage: action.value}
        }
        default: {
            return state
        }
    }
};

export default weatherReducer;
