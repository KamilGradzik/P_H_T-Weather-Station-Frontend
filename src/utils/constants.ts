export const ACTIONS = {
    SET_CITIES: 'SET_CITIES',
    SET_SENSORS: 'SET_SENSORS',
    SET_READINGS: 'SET_READINGS',
    ADD_READING: 'ADD_READING',
    SET_SELECTED_CITY: 'SET_SELECTED_CITY',
    SET_SELECTED_SENSORS: 'SET_SELECTED_SENSORS',
    SET_LANGUAGE: 'SET_LANGUAGE'
};

export const chartOptions = {
    responsive: true,
    color: 'rgb(255, 255, 255)',
    borderColor: 'rgb(255, 255, 255)',
    aspectRatio: 1/0.6,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.5)',
            },
            ticks: {
                color: 'rgb(255, 255, 255)'
            }
        },
        y: {
            //TODO: GET MIN/MAX FROM DATASET
            suggestedMin: -45,
            suggestedMax: 105,
            grid: {
                color: 'rgba(255, 255, 255, 0.5)',
                drawTicks: true
            },

            ticks: {
                min: 0,
                stepSize: 5,
                color: 'rgb(255, 255, 255)',
                beginAtZero: true
            }
        }
    },
};
