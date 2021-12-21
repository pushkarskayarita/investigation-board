import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    getLinesDB,
    getPicturesBoard,
    getPicturesDB,
    getTemplatesBoard,
} from '../helpers/indexedDB';
import { loadedPictures } from '../utils/loaded';
import MenuPanel from './menu/MenuPanel';
import Header from './header/Header';
import Draggable from './drag/Draggable';
import style from './App.css';
import { fetchPictures } from '../actions';
import { fetchBoardDataFromDB } from '../actions/board_actios';
import { templates } from '../utils/templates';
import LinesContainer from './board/lineRenderer/LinesContainer';
import EditPanel from './EditPanel/EditPanel';

const App = (props) => {
    const { picturesBoard, templatesBoard } = props.boardData;
    useEffect(() => {
        getPicturesDB()
            .then((pictures) => {
                const picturesIds = [];
                pictures.forEach((picture) => {
                    loadedPictures[picture.id] = picture.file;
                    picturesIds.push(picture.id);
                });
                props.onFetchPictures(picturesIds);
            })
            .then(() => {
                return Promise.all([
                    getPicturesBoard(),
                    getTemplatesBoard(),
                    getLinesDB(),
                ]);
            })
            .then((data) => {
                props.onFetchBoardDataFromDb(data);
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
                    <EditPanel />
                    <div className={`${style.boardContainer} droppable board`}>
                        <div className={style.boardFrame} ref={boardRef}>
                            <div className={style.boardBackground} />
                            <LinesContainer>
                                {templatesBoard.map((item) => {
                                    const elem = templates.find(
                                        (template) =>
                                            template.id === item.elementName
                                    );
                                    const TemplateBoard =
                                        elem[item.elementName];
                                    return (
                                        <Draggable
                                            key={item.id}
                                            containerRef={boardRef}
                                            startDrag={item}
                                            wide={elem.wide}
                                            initialDrag={false}
                                        >
                                            <TemplateBoard
                                                imagePlaceholder={true}
                                                scaleFactor={0}
                                                isOnBoard={true}
                                                id={item.id}
                                                imageSrc={item.imageSrc}
                                            />
                                        </Draggable>
                                    );
                                })}
                                {picturesBoard.map((item) => {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            containerRef={boardRef}
                                            startDrag={item}
                                        >
                                            <div className={style.filtered}>
                                                <img
                                                    src={item.imageSrc}
                                                    alt={item.id}
                                                />
                                            </div>
                                        </Draggable>
                                    );
                                })}
                            </LinesContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.picturesData.pictures,
        boardData: state.boardData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPictures: (data) => dispatch(fetchPictures(data)),
        onFetchBoardDataFromDb: (data) => dispatch(fetchBoardDataFromDB(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
