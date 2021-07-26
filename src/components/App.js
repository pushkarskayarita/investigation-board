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
import { componentsNames, templates } from '../utils/templates';
import LinesContainer from './board/lineRenderer/LinesContainer';

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

    const boardRef = useRef(null);
    const menuRef = useRef(null);

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
                    <div
                        className={`${style.boardContainer} droppable`}
                        ref={boardRef}
                    >
                        <Board />
                        {props.templatesBoard.map((item) => {
                            const elem = templates.find(
                                (template) => template.id === item.elementName
                            );
                            const TemplateBoard = elem[item.elementName];
                            return (
                                <Draggable
                                    key={item.id}
                                    containerRef={boardRef}
                                    startDrag={item}
                                >
                                    <TemplateBoard imagePlaceholder={true} />
                                </Draggable>
                            );
                        })}
                        {props.picturesBoard.map((item, index) => {
                            return (
                                <Draggable
                                    key={item.id}
                                    containerRef={boardRef}
                                    startDrag={item}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                        src={item.imageSrc}
                                        alt={item.id}
                                    />
                                </Draggable>
                            );
                        })}
                    </div>
                    <LinesContainer />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.picturesData.pictures,
        picturesBoard: state.picturesBoardData.picturesBoard,
        templatesBoard: state.picturesBoardData.templatesBoard,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPictures: (data) => dispatch(fetchPictures(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
