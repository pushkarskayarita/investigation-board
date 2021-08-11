import React from 'react';
import style from './EditPanel.css';

const DoneButton = ({ name, handler }) => {
    const handleClick = () => {
        console.log(console.log('Done Button'));
        handler();
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

export default DoneButton;
