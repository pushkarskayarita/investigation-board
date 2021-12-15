import React from 'react';
import style from './Card.css';

const Card = ({ src, alt, imagePlaceholder, id }) => {
    return (
        <div className={style.filtered}>
            <img
                className={imagePlaceholder ? 'imagePlaceholder' : ''}
                src={src}
                alt={alt}
                data-template={id}
            />
        </div>
    );
};

export default Card;
