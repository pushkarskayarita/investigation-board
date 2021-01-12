import React, { useState } from 'react';
import { connect } from 'react-redux';

import style from './Upload.css';
import { deletePicture } from '../../actions';

function UploadListItem(props) {
    const { id, imageSrc } = props;
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <li
            className={style.card}
            key={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
    };
};

export default connect(null, mapDispatchToProps)(UploadListItem);
