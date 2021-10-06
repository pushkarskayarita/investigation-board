import React from 'react';
import style from './lineRenderer.css';

const Pin = ({ draggablePin, id }) => {
    return (
        <li
            style={{
                display: draggablePin == id ? 'none' : 'block',
                position: 'relative',
            }}
            className={style.pin}
        />
    );
};

export default Pin;
