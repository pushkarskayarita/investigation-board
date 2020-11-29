import React from 'react'
import style from './Header.css'

function Header() {
    return (
        <div className={style.headerContainer}>
            <a to="/" className={style.headerLogoContainer}>
                Investigation board
            </a>
            <h1>Bank Case</h1>
            <div className={style.headerButtons}>Buttons</div>
        </div>
    )
}

export default Header
