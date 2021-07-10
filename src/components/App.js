import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { initiateDB, getPicturesDB } from '../helpers/indexedDB';
import { loadedPictures } from '../utils/loaded';
import MenuPanel from './menu/MenuPanel';
import Board from './board/Board';
import Header from './header/Header';
import Draggable from './drag/Draggable';
import style from './App.css';
import { fetchPictures } from '../actions';
import PhotoCard from './content_templates/PhotoCard';
import Note from './content_templates/Note';

const styles = {
    backgroundColor: '#416CA5',
    width: '100px',
    height: '100px',
};
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

    const boardRef = useRef();
    const menuRef = useRef();
    return (
        <div className={style.wrapper}>
            <div className={style.headerContainer}>
                <Header />
            </div>
            <div className={style.layoutContainer}>
                <div ref={menuRef} className={style.menuContainer}>
                    <MenuPanel containerRef={menuRef} />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.boardContainer} ref={boardRef}>
                        <Board />
                        <PhotoCard />
                        <Note />
                        {props.picturesBoard.map((item) => {
                            return (
                                <Draggable
                                    key={item.id}
                                    containerRef={boardRef}
                                    startDrag={item}
                                >
                                    <div style={styles}>
                                        {item.id} ITS A DIV
                                    </div>
                                </Draggable>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.picturesData.pictures,
        picturesBoard: state.picturesBoardData.picturesBoard,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPictures: (data) => dispatch(fetchPictures(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
