export const changeImageSrc = (elem, src) => {
    const elemChildren = elem.children;
    for (let item of elemChildren) {
        if (item.matches('.imagePlaceholder') && src) {
            item.src = src;
            return true;
        }
    }
    return false;
};

export const findIsDroppable = (clientX, clientY, elemRef) => {
    console.log('ELEM REF');
    const element = elemRef.current;
    element.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    console.log('ELEM BELLLOW>>>>>>>>>>>>>>>>>>>>>>>>>>', elemBelow);
    element.hidden = false;
    if (!elemBelow) return;
    return elemBelow.closest(`.droppable`);
};

export const calculateElementShift = (eventValues, elemRef, initialDrag) => {
    let shiftX;
    let shiftY;
    if (initialDrag) {
        shiftX = eventValues.clientX - eventValues.left;
        shiftY = eventValues.clientY - eventValues.top;
    } else {
        shiftX =
            eventValues.clientX - elemRef.current.getBoundingClientRect().left;
        shiftY =
            eventValues.clientY - elemRef.current.getBoundingClientRect().top;
    }
    return { shiftX, shiftY };
};

// const constrainBorders = () => {
//     const limitTop = -90;
//     const limitLeft = -330;
//     const limitRight =
//         containerRef.current.clientWidth + containerMargin - boxWidth;
//     const limitBottom =
//         containerRef.current.clientHeight +
//         containerMargin -
//         elemRef.current.offsetHeight;
//     //654 + 10 - 200 = 464
//     if (currentTopPosition <= limitTop) {
//         setPosition({
//             top: limitTop,
//         });
//     }
//     if (currentLeftPosition <= limitLeft) {
//         setPosition({
//             left: limitLeft,
//         });
//     }
//     if (currentLeftPosition > limitRight) {
//         setPosition({
//             left: limitRight,
//         });
//     }
//     if (currentTopPosition > limitBottom) {
//         setPosition({
//             top: limitBottom,
//         });
//     }
// };
