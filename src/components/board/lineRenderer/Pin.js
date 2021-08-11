import React from 'react';
import style from './lineRenderer.css';

const pinWidth = 20;
const pinHeight = 20;

const Pin = ({ position, draggablePin, id }) => {
    const handleClick = (event) => {
        console.log('PIN DRAG');
    };
    return (
        <li
            onClick={handleClick}
            style={{
                left: `${position.x - pinWidth / 2}px`,
                top: `${position.y - pinHeight / 2}px`,
                display: draggablePin == id ? 'none' : 'block',
            }}
            className={style.pin}
        />
    );
};

export default Pin;
