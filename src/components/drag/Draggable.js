import React, { useState, useEffect, useRef } from 'react';

const boxWidth = 140;
const boxHeight = 140;
const containerMargin = 10;
let sharedHandler = null;

const Draggable = ({ containerRef, startDrag, children }) => {
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const elemRef = useRef();
    let currentTopPosition;
    let currentLeftPosition;
    let shiftX;
    let shiftY;

    const moveAt = (event) => {
        currentLeftPosition =
            event.clientX -
            containerRef.current.getBoundingClientRect().left -
            shiftX;
        currentTopPosition =
            event.clientY -
            containerRef.current.getBoundingClientRect().top -
            shiftY;

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
            containerRef.current.clientHeight + containerMargin - boxWidth;
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

    const onDragStart = (event) => {
        shiftX = event.clientX - event.target.getBoundingClientRect().left;
        shiftY = event.clientY - event.target.getBoundingClientRect().top;

        moveAt(event);
        if (sharedHandler) {
            document.removeEventListener('mousemove', sharedHandler);
        }
        sharedHandler = handleMouseMove;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', sharedHandler);
    };

    useEffect(() => {
        console.log('USEEFFECT DRAGGABLE');

        onDragStart(startDrag.event);
    }, [startDrag]);

    const handleMouseDown = (event) => {
        console.log('My turn!!! handle mouseDown draggable');
        onDragStart(event);
    };

    const handleMouseMove = (event) => {
        moveAt(event);
        constrainBorders(event);
    };

    const handleMouseUp = () => {
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
                    height: boxHeight,
                    backgroundColor: 'red',
                }}
                onDragStart={() => {
                    return false;
                }}
                onMouseDown={handleMouseDown}
            >
                {children}
                <div>
                    left:${position.left} top: ${position.top} clientHeight: $
                    {document.documentElement.clientHeight} containerHeight: $
                    {containerRef.current.getBoundingClientRect().height + 20}{' '}
                    result$
                    {document.documentElement.clientHeight -
                        (containerRef.current.getBoundingClientRect().height +
                            20)}
                </div>
            </div>
        </>
    );
};

export default Draggable;
