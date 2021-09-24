import React, { useState } from 'react';
import style from './Note.css';

function Note() {
    const [text, setText] = useState('Hello Detective');
    return (
        <div className={`${style.note} ${style.outer} `}>
            <div
                onClick={() => setText('Meet me at 7pm at Malcomn')}
                className={style.inner}
            >
                {text}
            </div>
        </div>
    );
}

export default Note;
