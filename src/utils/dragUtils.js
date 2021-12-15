export const changeImageSrc = (elem, src) => {
    let isSrcChanged = false;
    let templateId = '';

    function findPlaceholder(element, imgSrc) {
        const childElements = element.children;
        if (childElements.length > 0) {
            for (const item of childElements) {
                if (item.matches('.imagePlaceholder') && src) {
                    item.src = imgSrc;
                    templateId = item.dataset.template;
                    isSrcChanged = true;
                }
                if (item.children.length > 0) {
                    findPlaceholder(item, src);
                }
            }
        }
    }

    findPlaceholder(elem, src);
    return { isSrcChanged, templateId };
};

export const findIsDroppable = (clientX, clientY, elemRef) => {
    const element = elemRef.current;
    element.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    element.hidden = false;
    if (!elemBelow) return false;
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
