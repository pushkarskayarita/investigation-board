import React from 'react';
import MenuPanel from './menu/MenuPanel';
import Board from './board/Board';
import Header from './header/Header';
import style from './App.css';
import FilesList from './FilesList';

export default function App() {
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
                    <FilesList />
                </div>
            </div>
        </div>
    );
}
