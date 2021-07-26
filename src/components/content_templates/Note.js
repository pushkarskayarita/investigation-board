import React from 'react';
import style from './Note.css';

function Note() {
    return (
        <div className={`${style.note} ${style.outer} `}>
            <div className={style.inner}>
                <p>
                    80 Columbus Circle <br />
                    4pm
                </p>
            </div>
        </div>
    );
}

export default Note;
