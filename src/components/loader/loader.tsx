import React, { CSSProperties } from 'react';
import './loader.scss';
import CloudGif from '../../assets/raining-cloud.gif'


const Loader: React.FC<{showLoader: boolean}> = (props: {showLoader: boolean}) => {
    const styles: CSSProperties = {
        visibility: props.showLoader ? 'visible' : 'hidden',
        opacity: props.showLoader ? '1' : '0',
        transition: 'opacity .2s ease-in-out'
    }

    return (
        <div className={`loader`} style={styles}>
            <div className={'gif-wrapper'}>
                <img className={'cloud-img'} src={CloudGif} alt={'cloudy'}/>
            </div>
        </div>
    )
}

export default Loader;