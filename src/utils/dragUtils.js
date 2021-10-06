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
    const element = elemRef.current;
    element.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
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
