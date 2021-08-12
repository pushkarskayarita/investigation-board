import React from 'react';
import style from './EditPanel.css';

const EditPanelButton = ({ name, handler }) => {
    const handleClick = () => {
        handler();
    };
    return (
        <button
            type="button"
            className={style.panelButton}
            onClick={handleClick}
        >
            {name}
        </button>
    );
};

export default EditPanelButton;
