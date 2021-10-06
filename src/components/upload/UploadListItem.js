import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import style from './Upload.css';
import { deletePicture } from '../../actions';
import { addElementToBoard } from '../../actions/board_actios';

let counter = 0;

function UploadListItem(props) {
    const { id, imageSrc } = props;

    const [isHover, setIsHover] = useState(false);
    const uploadIconRef = useRef();

    const incrementCounter = () => {
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
        event.preventDefault();
        incrementCounter();
        const pictureBoardId = createPictureBoardId(id);
        const coords = event.target.getBoundingClientRect();
        props.onAddElementToBoard({
            id: pictureBoardId,
            dragStartPositions: {
                top: coords.top,
                left: coords.left,
                clientX: event.clientX,
                clientY: event.clientY,
            },
            imageSrc,
            elementName: 'img',
            list: 'picturesBoard',
        });
    };

    return (
        <li
            ref={uploadIconRef}
            className={`${style.card} ${style.filtered}`}
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
        onAddElementToBoard: (data) => dispatch(addElementToBoard(data)),
    };
};

export default connect(null, mapDispatchToProps)(UploadListItem);
