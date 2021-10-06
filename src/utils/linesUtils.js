export const calcCoordsRelativeToContainer = (container, clientX, clientY) => {
    const containerCoords = container.getBoundingClientRect();
    const x = clientX - containerCoords.left - container.clientLeft;
    const y = clientY - containerCoords.top - container.clientTop;
    return { x, y };
};
