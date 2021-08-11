import { path } from 'd3-path';
import { select } from 'd3-selection';

export const lines = {};

export function removePath(lineId) {
    if (lines[lineId]) {
        lines[lineId].remove();
    }
}

export function drawLine(
    node,
    originX,
    originY,
    destinationX,
    destinationY,
    lineId
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
        .attr('d', context.toString());

    return lines[lineId];
}
