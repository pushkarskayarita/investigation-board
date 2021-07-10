import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import style from './Upload.css';
import { addPictureToBoardList, deletePicture } from '../../actions';

let counter = 0;

function UploadListItem(props) {
    const { id, imageSrc } = props;
    // const [counter, setCounter] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const uploadIconRef = useRef();

    const incrementCounter = () => {
        console.log('COUNTER', counter);
        counter += 1;
    };
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const createPictureBoardId = (listItemId) => {
        return listItemId + counter;
    };

    const handleDragStart = (event) => {
        // setCounter(counter + 1);
        incrementCounter();
        const pictureBoardId = createPictureBoardId(id);
        props.onAddPicturesToBoardList({ id: pictureBoardId, event, imageSrc });
    };

    return (
        <li
            ref={uploadIconRef}
            className={style.card}
            key={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragStart={handleDragStart}
        >
            <img alt="" src={imageSrc} />
            <span className={isHover ? '' : style.hide}>
                <button
                    type="button"
                    onClick={() => {
                        props.onDeletePicture(id);
                    }}
                    className={style.deleteBtn}
                >
                    Delete
                </button>
            </span>
        </li>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePicture: (data) => {
            dispatch(deletePicture(data));
        },
        onAddPicturesToBoardList: (data) =>
            dispatch(addPictureToBoardList(data)),
    };
};

export default connect(null, mapDispatchToProps)(UploadListItem);
