import React, { Component } from 'react';
import styles from './lineRenderer.css';
import { drawLine, removePath, selectLine } from '../../../helpers/d3helpers';

class LineRenderer extends Component {
    constructor(props) {
        super(props);
        this.pathContainer = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.linesData.linesKeysMap !==
                prevProps.linesData.linesKeysMap ||
            this.props.linesData.pins !== prevProps.linesData.pins ||
            this.props.linesData.selectedLine !==
                prevProps.linesData.selectedLine
        ) {
            this.renderLines();
            selectLine(this.props.linesData.selectedLine);
        }
    }

    renderLines = () => {
        const { linesKeysMap, pins } = this.props.linesData;
        const { onSelectElement } = this.props;
        const linesKeys = Object.keys(linesKeysMap);

        if (linesKeys.length > 0) {
            linesKeys.forEach((id) => {
                removePath(id);
            });

            linesKeys.forEach((line) => {
                const originX = pins[linesKeysMap[line].start].x;
                const originY = pins[linesKeysMap[line].start].y;
                const destinationX = pins[linesKeysMap[line].end].x;
                const destinationY = pins[linesKeysMap[line].end].y;
                drawLine(
                    this.pathContainer.current,
                    originX,
                    originY,
                    destinationX,
                    destinationY,
                    line,
                    onSelectElement
                );
            });
        }
    };

    render() {
        const { pinMode } = this.props;
        return (
            <div
                style={
                    pinMode
                        ? { pointerEvents: 'auto' }
                        : { pointerEvents: 'none' }
                }
                className={styles.pathContainer}
            >
                <svg
                    key="svgCurve"
                    ref={this.pathContainer}
                    className={styles.pathContainer}
                />
            </div>
        );
    }
}

export default LineRenderer;
