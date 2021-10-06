import React, { useState } from 'react';
import style from './Note.css';

function Note() {
    const [text, setText] = useState('Meet me at 7pm at Malcolm square');
    return (
        <div className={`${style.note} ${style.outer} `}>
            <div
                onClick={() => setText('Hello detective')}
                className={style.inner}
            >
                {text}
            </div>
        </div>
    );
}

export default Note;
