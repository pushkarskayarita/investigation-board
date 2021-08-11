import React from 'react';
import style from './EditPanel.css';

const ResizeElementButton = ({ name }) => {
    const handleClick = () => {
        console.log('CLICK RESIZE');
    };
    return (
        <button className={style.panelButton} onClick={handleClick}>
            {name}
        </button>
    );
};

export default ResizeElementButton;
