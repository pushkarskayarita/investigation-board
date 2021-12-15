import React from 'react';
import SaveBoardButton from './SaveBoardButton';
import style from './Header.css';

function Header() {
    return (
        <div className={style.headerContainer}>
            <div className={style.headerLogoContainer}>Investigation board</div>
            <SaveBoardButton />
        </div>
    );
}

export default Header;
