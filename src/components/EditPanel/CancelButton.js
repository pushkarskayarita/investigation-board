import React from 'react';
import style from './EditPanel.css';

const CancelButton = ({ name, handler }) => {
    const handleClick = () => {
        console.log(console.log('Cancel Button'));
    };
    return (
        <button
            className={`${style.panelButton} ${style.pushRight}`}
            onClick={handleClick}
        >
            {name}
        </button>
    );
};

export default CancelButton;
