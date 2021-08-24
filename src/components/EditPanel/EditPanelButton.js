import React from 'react';
import style from './EditPanel.css';

const EditPanelButton = ({ name, handler, pushRight }) => {
    return (
        <button
            type="button"
            className={
                pushRight
                    ? `${style.panelButton} ${style.pushRight}`
                    : style.panelButton
            }
            onClick={handler}
        >
            {name}
        </button>
    );
};

export default EditPanelButton;
