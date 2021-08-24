import { path } from 'd3-path';
import { select } from 'd3-selection';

export const lines = {};

export function removePath(lineId) {
    if (lines[lineId]) {
        lines[lineId].remove();
        delete lines[lineId];
    }
}

export function drawLine(
    node,
    originX,
    originY,
    destinationX,
    destinationY,
    lineId,
    callback
) {
    const context = path();
    const canvas = select(node);

    if (lines[lineId]) {
        lines[lineId].remove();
    }

    context.moveTo(originX, originY);
    context.lineTo(destinationX, destinationY);

    lines[lineId] = canvas
        .append('path')
        .attr('class', 'link')
        .attr('d', context.toString())
        .on('mousedown', () => {
            callback(lineId, 'lines');
        });

    return lines[lineId];
}

export function selectLine(lineId) {
    Object.values(lines).forEach((line) => line.style('stroke', '#f33'));
    if (lineId) {
        const selectedLine = lines[lineId];
        selectedLine.style('stroke', '#6b9cf2');
    }
}
