import React from 'react';
import Card from './Сard';
import poster from '../../images/poster.jpg';
import style from './Poster.css';

function Poster({ imagePlaceholder }) {
    return (
        <div
            className={
                imagePlaceholder
                    ? `${style.poster} droppable`
                    : `${style.poster}`
            }
        >
            <Card
                imagePlaceholder={imagePlaceholder}
                src={poster}
                alt="poster template"
            />
        </div>
    );
}

export default Poster;
