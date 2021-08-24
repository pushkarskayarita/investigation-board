import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    deleteElementFromBoard,
    selectElement,
} from '../../actions/board_actios';
import {
    changeImageSrc,
    findIsDroppable,
    calculateElementShift,
} from '../../utils/dragUtils';
import style from './Draggable.css';

const boxWidth = 200;
const containerMargin = 10;
let sharedHandler = null;
let isSrcChanged = false;

const Draggable = ({
    containerRef,
    startDrag,
    children,
    onDeleteElementFromBoard,
    onSelectElement,
    boardData,
    pinMode,
}) => {
    const [position, setPosition] = useState({ left: -9999, top: -9999 });
    const elemRef = useRef();
    const { activeElement } = boardData;
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
        // 654 + 10 - 200 = 464
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
        onSelectElement(startDrag.id, startDrag.list);
        elementShift = calculateElementShift(eventValues, elemRef, initialDrag);

        moveAt(eventValues);
        if (sharedHandler) {
            document.removeEventListener('mousemove', sharedHandler);
        }
        // eslint-disable-next-line no-use-before-define
        sharedHandler = handleMouseMove;
        // eslint-disable-next-line no-use-before-define
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', sharedHandler);
    };

    // When event is passed from li useEffect works
    useEffect(() => {
        onDragStart(startDrag.dragStartPositions, true);
    }, []);

    const handleMouseDown = (event) => {
        // console.log('DRAAGGABLE mouse down');
        if (pinMode) {
            // console.log('draggable id', startDrag.id);
        } else {
            const eventValues = {
                clientX: event.clientX,
                clientY: event.clientY,
            };
            onDragStart(eventValues, false);
        }
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
                className={
                    activeElement.id === startDrag.id
                        ? `${style.active} boardItem`
                        : 'boardItem'
                }
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
        boardData: state.boardData,
        pinMode: state.editPanel.pinMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteElementFromBoard: (id, list) =>
            dispatch(deleteElementFromBoard(id, list)),
        onSelectElement: (id, list) => dispatch(selectElement(id, list)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);
