import React from 'react';
import style from './EditPanel.css';

const AddPinButton = ({ name, onAddPin }) => {
    const handleClick = () => {
        onAddPin();
    };
    return (
        <button className={style.panelButton} onClick={handleClick}>
            {name}
        </button>
    );
};

export default AddPinButton;
