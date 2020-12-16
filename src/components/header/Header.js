import React from 'react';
import style from './Header.css';

function Header() {
    return (
        <div className={style.headerContainer}>
            <a href="/" className={style.headerLogoContainer}>
                Investigation board
            </a>
            <div className={style.headerButtons}>Buttons</div>
        </div>
    );
}

export default Header;
