import React from 'react';
import style from './PhotoCard.css';
import image2 from '../../images/Rectangle.jpg';

function PhotoCard() {
    console.log('IMAGE2', image2);
    return (
        <div className={style.polaroid}>
            <div className={style.photoWrap}>
                <img
                    className={style.photo}
                    // src="/images/photo1.jpg"
                    src={image2}
                    alt="polaroid"
                />
            </div>
        </div>
    );
}

export default PhotoCard;
