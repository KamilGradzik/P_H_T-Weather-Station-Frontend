import { ReactElement } from "react";
import "./weather-readings-tile.scss"
import backgroundDay from '../../assets/Day_iOSthemes.png';
import backgroundNight from '../../assets/Night_iOSthemes.png';
import { FaTint, FaSmog } from 'react-icons/fa'
import { CityReading } from '../../models/city-reading';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const celcius = "°C"
const farenheit = "°F"
const humid = "%"
const pollu = "µg/m³"

const WeatherReadingTile:React.FC<CityReading> = ({...props}):ReactElement => {
    const { t } = useTranslation('common');
    const readingTime = moment.utc(props.date).local()
    const nightBreakpointTime = moment('18:00', 'HH:mm');
    const background = readingTime.isAfter(nightBreakpointTime) ? backgroundNight : backgroundDay;
    const converted = convertToFarenheit(+props.temperature)
    return(
        <div className="readings-tile">
            <img src={background} alt="" />
            <div className="tile-content">
                <div className="tile-container">
                    <div className="background-tint">
                        <div className="hour-date">
                            <span>{moment(props.date).format('HH:mm')}</span>
                        </div>
                        <div className="temperature-reading">
                            <span>{props.temperature}{celcius} | {converted}{farenheit}</span>
                        </div>
                        <div className="readings">
                            <div className="single-reading">
                                <span><FaTint/>&nbsp;{t('labels.humidity')}:</span><span>{props.humidity}{humid}</span>
                            </div>
                            <div className="single-reading">
                                <span><FaSmog/>&nbsp;{t('labels.pollution')}:&nbsp;</span><span>{props.pollution}{pollu}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

    )
}

const convertToFarenheit = (temperature:number):number => {
    var farenheit = (temperature * 1.8 + 32).toFixed(2)
    return +farenheit
}

export default WeatherReadingTile