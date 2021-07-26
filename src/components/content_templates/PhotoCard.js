import React from 'react';
import style from './PhotoCard.css';
import image2 from '../../images/Rectangle.jpg';

function PhotoCard({ imagePlaceholder }) {
    console.log('IMAGE PLASEHOLDER', imagePlaceholder);
    return (
        // <div className={style.testwraper}>
        <div className={style.polaroid}>
            <div
                className={
                    imagePlaceholder
                        ? `${style.outer} droppable`
                        : `${style.outer}`
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
        // </div>
    );
}

export default PhotoCard;