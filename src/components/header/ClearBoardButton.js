import React from 'react';
import { connect } from 'react-redux';
import { clearBoard } from '../../actions/board_actios';
import { clearCanvas } from '../../helpers/d3helpers';
import style from './Header.css';

const ClearBoardButton = (props) => {
    const handleClick = () => {
        props.onClearBoard();
        clearCanvas();
    };
    return (
        <button
            type="button"
            className={`${style.saveButton} ${style.clearButton}`}
            onClick={handleClick}
        >
            Clear Board
        </button>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearBoard: () => dispatch(clearBoard()),
    };
};

export default connect(null, mapDispatchToProps)(ClearBoardButton);
