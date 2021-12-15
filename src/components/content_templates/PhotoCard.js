import React from 'react';
import style from './PhotoCard.css';

function PhotoCard({ imagePlaceholder, id, imageSrc }) {
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
                    data-template={id}
                    className={
                        imagePlaceholder
                            ? `${style.inner} imagePlaceholder`
                            : `${style.inner}`
                    }
                    src={imageSrc}
                    alt="polaroid"
                />
            </div>
        </div>
    );
}

export default PhotoCard;
