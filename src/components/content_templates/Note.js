import React from 'react';
import style from './Note.css';

function Note() {
    return (
        <div contentEditable className={style.note}>
            80 Columbus Circle <br />
            4pm
        </div>
    );
}

export default Note;
