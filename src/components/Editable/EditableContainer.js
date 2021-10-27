import React, { useRef, useState } from 'react';
import Editable from './Editable';
import setInputHeight from '../../utils/setInputHeight';
import style from './EditableContainer.css';

function EditableContainer({ isOnBoard, placeholderText }) {
    const inputRef = useRef();
    const [title, setTitle] = useState(placeholderText);
    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(!hover);
    };

    return (
        <Editable
            text={title}
            placeholder=""
            childRef={inputRef}
            type="textarea"
        >
            <textarea
                readOnly={!isOnBoard}
                onMouseOver={handleHover}
                onMouseOut={handleHover}
                onBlur={handleHover}
                onFocus={handleHover}
                className={
                    isOnBoard
                        ? style.editableTextareaActive
                        : style.editableTextarea
                }
                ref={inputRef}
                name="title"
                value={title}
                onChange={(event) => {
                    if (!isOnBoard) return;
                    if (isOnBoard) {
                        setTitle(event.target.value);
                        setInputHeight(event, '100');
                    }
                }}
            />
        </Editable>
    );
}

export default EditableContainer;
