import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initiateDB, getPicturesDB } from '../helpers/indexedDB';
import { loadedPictures } from '../utils/loaded';
import MenuPanel from './menu/MenuPanel';
import Board from './board/Board';
import Header from './header/Header';
import style from './App.css';
import { fetchPictures } from '../actions';

const App = (props) => {
    useEffect(() => {
        initiateDB();
        getPicturesDB().then((pictures) => {
            const picturesIds = [];
            pictures.forEach((picture) => {
                loadedPictures[picture.id] = picture.file;
                picturesIds.push(picture.id);
            });

            props.onFetchPictures(picturesIds);
        });
    }, []);

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
        </div>
    );
};

const mapStateToProps = (state) => {
    return { pictures: state.picturesData.pictures };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPictures: (data) => dispatch(fetchPictures(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
