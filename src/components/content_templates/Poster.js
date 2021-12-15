import React from 'react';
import Card from './Сard';
import style from './Poster.css';

function Poster({ imagePlaceholder, id, imageSrc }) {
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
                src={imageSrc}
                alt="poster template"
                id={id}
            />
        </div>
    );
}

export default Poster;
