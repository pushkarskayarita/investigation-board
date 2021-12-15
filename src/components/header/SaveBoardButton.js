import React from 'react';
import { connect } from 'react-redux';
import { saveBoard } from '../../actions/board_actios';
import style from './Header.css';

const SaveBoardButton = ({ onSaveBoard, boardData, lines }) => {
    const handleClick = () => {
        const { activeElement, ...boardItems } = boardData;
        onSaveBoard(boardItems, lines);
    };
    return (
        <button className={style.saveButton} onClick={handleClick}>
            Save case
        </button>
    );
};

const mapStateToProps = (state) => {
    return {
        boardData: state.boardData,
        lines: state.lines,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveBoard: (boardItems, lines) => {
            dispatch(saveBoard(boardItems, lines));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveBoardButton);
