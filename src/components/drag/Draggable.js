import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { deleteElementFromBoard } from '../../actions/drag_and_drop_actios';
import {
    changeImageSrc,
    findIsDroppable,
    calculateElementShift,
} from '../../utils/dragUtils';

const boxWidth = 200;
const containerMargin = 10;
let sharedHandler = null;
let isSrcChanged = false;

const Draggable = ({
    containerRef,
    startDrag,
    children,
    onDeleteElementFromBoard,
}) => {
    const [position, setPosition] = useState({ left: -9999, top: -9999 });
    // const [isSrcChanged, setIsSrcChanged] = useState(false);
    const elemRef = useRef();

    let currentTopPosition;
    let currentLeftPosition;
    let elementShift;

    const moveAt = (eventValues) => {
        currentLeftPosition =
            eventValues.clientX -
            containerRef.current.getBoundingClientRect().left -
            elementShift.shiftX;
        currentTopPosition =
            eventValues.clientY -
            containerRef.current.getBoundingClientRect().top -
            elementShift.shiftY;
        setPosition({
            left: currentLeftPosition,
            top: currentTopPosition,
        });
    };

    const constrainBorders = () => {
        const limitTop = -90;
        const limitLeft = -330;
        const limitRight =
            containerRef.current.clientWidth + containerMargin - boxWidth;
        const limitBottom =
            containerRef.current.clientHeight +
            containerMargin -
            elemRef.current.offsetHeight;
        //654 + 10 - 200 = 464
        if (currentTopPosition <= limitTop) {
            setPosition({
                top: limitTop,
            });
        }
        if (currentLeftPosition <= limitLeft) {
            setPosition({
                left: limitLeft,
            });
        }
        if (currentLeftPosition > limitRight) {
            setPosition({
                left: limitRight,
            });
        }
        if (currentTopPosition > limitBottom) {
            setPosition({
                top: limitBottom,
            });
        }
    };

    const onDragStart = (eventValues, initialDrag) => {
        elementShift = calculateElementShift(eventValues, elemRef, initialDrag);

        moveAt(eventValues);
        if (sharedHandler) {
            document.removeEventListener('mousemove', sharedHandler);
        }
        sharedHandler = handleMouseMove;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', sharedHandler);
    };

    //When event is passed from li useEffect works
    useEffect(() => {
        onDragStart(startDrag.dragStartPositions, true);
    }, []);

    const handleMouseDown = (event) => {
        const eventValues = {
            clientX: event.clientX,
            clientY: event.clientY,
        };
        onDragStart(eventValues, false);
    };

    const handleMouseMove = (event) => {
        const eventValues = {
            clientX: event.clientX,
            clientY: event.clientY,
        };
        moveAt(eventValues);
        constrainBorders(event);
    };

    const handleMouseUp = (event) => {
        const droppable = findIsDroppable(
            event.clientX,
            event.clientY,
            elemRef
        );
        console.log('DROPPABLE________________', droppable);
        if (droppable) {
            isSrcChanged = changeImageSrc(droppable, startDrag.imageSrc);
            if (isSrcChanged) {
                onDeleteElementFromBoard(startDrag.id, startDrag.list);
            }
        }

        if (!droppable) {
            onDeleteElementFromBoard(startDrag.id, startDrag.list);
        }

        document.removeEventListener('mousemove', sharedHandler);
        document.removeEventListener('mouseup', handleMouseUp);
        sharedHandler = null;
    };

    return (
        <>
            <div
                ref={elemRef}
                style={{
                    position: 'absolute',
                    zIndex: 100,
                    left: position ? `${position.left}px` : undefined,
                    top: position ? `${position.top}px` : undefined,
                    width: boxWidth,
                    maxWidth: boxWidth,
                }}
                onDragStart={(event) => event.preventDefault()}
                onMouseDown={handleMouseDown}
            >
                {children}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.picturesData.pictures,
        picturesBoard: state.picturesBoardData.picturesBoard,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteElementFromBoard: (id, list) =>
            dispatch(deleteElementFromBoard(id, list)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);