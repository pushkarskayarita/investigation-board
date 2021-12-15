import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import style from './Upload.css';
import { deletePicture } from '../../actions';
import { addElementToBoard } from '../../actions/board_actios';

function UploadListItem(props) {
    const { id, imageSrc } = props;
    const [isHover, setIsHover] = useState(false);
    const uploadIconRef = useRef();
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleDragStart = (event) => {
        event.preventDefault();
        const coords = event.target.getBoundingClientRect();
        props.onAddElementToBoard({
            id: nanoid(8),
            dragStartPositions: {
                top: coords.top,
                left: coords.left,
                clientX: event.clientX,
                clientY: event.clientY,
            },
            imageSrc,
            elementName: 'img',
            list: 'picturesBoard',
            coords: {},
            loadedPictureFileId: id,
        });
    };

    return (
        <li
            ref={uploadIconRef}
            className={`${style.card} ${style.filtered}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragStart={handleDragStart}
            aria-label="uploaded image"
        >
            <img alt="loadedImg" src={imageSrc} />
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
