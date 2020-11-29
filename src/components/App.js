import React, { useState } from 'react'
import MenuPanel from './menu/MenuPanel'
import Board from './Board'
import Header from './header/Header'
import style from './App.css'

export default function App() {
    // const [count, setCount] = useState(0)
    return (
        <div className={style.wrapper}>
            <div className={style.headerContainer}>
                <Header />
            </div>
            <div className={style.layoutContainer}>
                <div className={style.menuContainer}>
                    <MenuPanel />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.boardContainer}>
                        <Board />
                    </div>
                </div>
            </div>

            {/*<button onClick={() => setCount(count + 1)}>{count}</button>*/}
        </div>
    )
}
