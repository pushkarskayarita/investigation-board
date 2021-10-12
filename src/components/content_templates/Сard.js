import React from 'react';
import style from './Card.css';

const Card = ({ src, alt, imagePlaceholder }) => {
    return (
        <div className={style.filtered}>
            <img
                className={imagePlaceholder ? 'imagePlaceholder' : ''}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Card;
