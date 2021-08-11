import React from 'react';
import style from './Header.css';

function Header() {
    return (
        <div className={style.headerContainer}>
            <div className={style.headerLogoContainer}>Investigation board</div>
        </div>
    );
}

export default Header;
