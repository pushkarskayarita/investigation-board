import React from 'react'
import style from './Board.css'

class Board extends React.Component {
    render() {
        return (
            <div className={style.containerBoard}>
                <div className={style.canvas}>This is a detective board</div>
            </div>
        )
    }
}

export default Board
