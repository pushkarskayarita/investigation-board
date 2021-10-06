import React from 'react';
import style from './PhotoCard.css';
import image2 from '../../images/Rectangle.jpg';

function PhotoCard({ imagePlaceholder }) {
    return (
        <div className={style.polaroid}>
            <div
                className={
                    imagePlaceholder
                        ? `${style.outer} ${style.filtered} droppable`
                        : `${style.outer} ${style.filtered}`
                }
            >
                <img
                    className={
                        imagePlaceholder
                            ? `${style.inner} imagePlaceholder`
                            : `${style.inner}`
                    }
                    src={image2}
                    alt="polaroid"
                />
            </div>
        </div>
    );
}

export default PhotoCard;
