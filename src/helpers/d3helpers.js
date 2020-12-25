import { path } from 'd3-path';
import { select } from 'd3-selection';

export function removePath(line) {
    if (line) {
        line.remove();
    }
}

export const lines = {};

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
