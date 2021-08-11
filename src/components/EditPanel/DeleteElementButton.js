import React from 'react';
import style from './EditPanel.css';

const DeleteElementButton = ({ name }) => {
    const handleClick = () => {
        console.log(console.log('Delete button'));
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

export default DeleteElementButton;
