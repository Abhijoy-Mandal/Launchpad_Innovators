import React, { useEffect, useState } from 'react';
import '../styles/InfoBox.css';

const InfoBox = ({name,e,a,ma,i,om,w}) => {

    return (
        <div className = 'info-box'>
            <div className='header'>
                <h2>{name}</h2>
            </div>
            <div className='properties'>
                <ul padding='0'>
                    <li> eccentricity: {e}</li>
                    <li> semimajor axis: {a}</li>
                    <li> inclination: {i}</li>
                    <li> longitude of ascending node: {om}</li>
                    <li> argument of perihilion: {w}</li>
                    <li> mean anomaly: {ma} </li>
                </ul>

            </div>
        </div>
    );


}

export default InfoBox;