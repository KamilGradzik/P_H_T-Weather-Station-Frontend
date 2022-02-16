import React, { Dispatch, useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { FaTint, FaSmog } from 'react-icons/fa';
import './city-readings-modal.scss';
import backgroundDay from '../../assets/Day_iOSthemes.png';
import backgroundNight from '../../assets/Night_iOSthemes.png';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { ACTIONS, chartOptions } from '../../utils/constants';
import { CityReading } from '../../models/city-reading';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import City from '../../models/city';
import { getCityReadingsFromDate } from '../../services/cities.service';
import { AxiosResponse } from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ICityReadingsModalProps extends CityReading{
    selectedCity: City,
    getReadingsFromDate: (id:number, numberOfCalls?: number, interval?: number, date?:string) => any[],
    setShowModal: Dispatch<boolean>
}

const CityReadingsModal: React.FC<ICityReadingsModalProps> = (props: ICityReadingsModalProps) => {
    const [readings, setReadings] = useState<CityReading[]>([]);
    const [chartData, setChartData] = useState(null);

    const readingTime = moment.utc(props.date).local();
    const nightBreakpointTime = moment('18:00', 'HH:mm');
    const backgroundImage = {background: `url(${readingTime.isAfter(nightBreakpointTime) ? backgroundNight : backgroundDay}) 50% 50% no-repeat`};

    const [t] = useTranslation('common');

    let numberOfReq = 4;
    if (moment.utc(props.date).format('HH') === moment().utc().format('HH')) {
        numberOfReq = Math.floor(+moment().utc().format('mm') / 15)
    }
    const labels: string[] = [];
    for (let i = 1; i < 5; i++) labels.push(moment.utc(props.date).local().add(15 * i, 'minutes').format('HH:mm'))

    useEffect(() => {
        Promise.all(props.getReadingsFromDate(props.selectedCity.id, numberOfReq, 15, moment.utc(props.date).format()))
            .then(value => {
                value.forEach(v => {
                    v['date'] = moment.utc(v.date).local().format();
                    v['pollution'] = Math.abs(+v['pollution']) * 10;
                })
                value.sort((a,b) => moment.utc(a.date).diff(moment.utc(b.date)));

                setReadings(value);
            });
    }, [])


    useEffect(() => {
        if (readings?.length) {
             const data = {
                labels: labels,
                datasets: [
                    {
                        label: t('labels.temperature'),
                        data: readings.map(t => +t.temperature),
                        backgroundColor: 'rgba(239, 235, 214, 1)',
                    },
                    {
                        label: t('labels.humidity'),
                        data: readings.map(h => +h.humidity),
                        backgroundColor: 'rgba(93, 156, 255, 0.8)',
                    },
                    {
                        label: t('labels.pollution'),
                        data: readings.map(p => +p.pollution),
                        backgroundColor: 'rgba(181, 173, 119, 0.8)',
                    }
                ]
            }
            setChartData(data);
        }
    }, [readings])

    const temp = (celsius: number): string => {
        const fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
        return `${celsius}°C | ${fahrenheit}°F`
    }

    const onClose = () => {
        props.setShowModal(false);
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-container" style={backgroundImage} onClick={event => event.stopPropagation()}>
                <div className="modal-content-background">
                    <div className="modal-header" >
                        <h1>{props.selectedCity.city_name}</h1>
                        <h2>{readingTime.format('HH:mm')} - {readingTime.add(60, 'minutes').format('HH:mm')}</h2>
                        <div className="close-icon"><GrClose size={'1.5em'} color="#FFF" onClick={onClose} /></div>
                    </div>
                    <div className="modal-body">
                        <div className="readings-container">
                            <div className="reading temperature">
                                {temp(+props.temperature)}
                            </div>
                            <div className="reading">
                                <span><FaTint /> {t('labels.humidity')}: </span> <span>{props.humidity}%</span>
                            </div>
                            <div className="reading">
                                <span><FaSmog /> {t('labels.pollution')}: </span> <span>{props.pollution}µg/m³</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            { chartData &&
                                <Bar  data={chartData}
                                      width={null}
                                      height={null}
                                      options={chartOptions} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityReadingsModal;