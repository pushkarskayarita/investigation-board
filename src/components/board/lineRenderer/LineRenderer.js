import React, { Component } from 'react';
import styles from './lineRenderer.css';
import { drawLine, removePath, selectLine } from '../../../helpers/d3helpers';

class LineRenderer extends Component {
    constructor(props) {
        super(props);
        this.pathContainer = React.createRef();
        this.state = {
            container: null,
        };
    }

    componentDidMount() {
        this.setState({
            container: this.pathContainer.current,
        });
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.linesData !== prevProps.linesData ||
            Object.keys(prevProps.linesData.linesKeysMap).every(
                (lineKey, i) => {
                    return (
                        lineKey !==
                        Object.keys(this.props.linesData.linesKeysMap)[i]
                    );
                }
            )
        ) {
            // console.log('props changed');
            this.renderLines();
            selectLine(this.props.linesData.selectedLine);
        } else {
            // console.log('the same');
        }
    }

    renderLines = () => {
        const { linesKeysMap, pins } = this.props.linesData;
        const { onSelectElement } = this.props;
        // should remove previous before render new!
        Object.entries(linesKeysMap).forEach(([id, line]) => {
            removePath(line, id);
        });

        Object.keys(linesKeysMap).forEach((line) => {
            const originX = pins[linesKeysMap[line].start].x;
            const originY = pins[linesKeysMap[line].start].y;
            const destinationX = pins[linesKeysMap[line].end].x;
            const destinationY = pins[linesKeysMap[line].end].y;

            drawLine(
                this.state.container,
                originX,
                originY,
                destinationX,
                destinationY,
                line,
                onSelectElement
            );
        });
    };

    render() {
        const { pinMode, deleteConnection } = this.props;
        return (
            <div
                style={
                    pinMode || deleteConnection
                        ? { pointerEvents: 'auto' }
                        : { pointerEvents: 'none' }
                }
                className={styles.pathContainer}
                onMouseDown={() => {
                    // console.log('mouseDOWWNNNNNNN!!!!!');
                }}
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
