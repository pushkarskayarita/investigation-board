import React from 'react';
import style from './Board.css';
import Pin from '../board/lineRenderer/pin';

class Board extends React.Component {
    render() {
        return <div className={`${style.board}`}></div>;
    }
}

export default Board;
