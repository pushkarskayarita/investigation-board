import React from 'react';
import EditableContainer from '../Editable/EditableContainer';
import style from './Note.css';

const defaultNoteFontSize = 14;

function Note({ isOnBoard, scaleFactor }) {
    const fontSizeStyle = scaleFactor
        ? { fontSize: `${defaultNoteFontSize * scaleFactor}px` }
        : {};
    return (
        <div
            style={fontSizeStyle}
            className={`${style.note} ${style.outer} ${style.filtered}`}
        >
            <div className={style.inner}>
                <EditableContainer
                    isOnBoard={isOnBoard}
                    placeholderText="Meet me at 7pm at Malcolm square"
                />
            </div>
        </div>
    );
}

export default Note;
