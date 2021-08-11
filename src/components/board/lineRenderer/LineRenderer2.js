import React, { Component } from 'react';
import styles from './lineRenderer.css';
import { drawLine, removePath } from '../../../helpers/d3helpers';

class LineRenderer2 extends Component {
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
        } else {
            // console.log('the same');
        }
    }

    renderLines = () => {
        const { linesKeysMap, pins } = this.props.linesData;

        //should remove previos before render new!
        Object.entries(linesKeysMap).forEach(([id, line]) => {
            removePath(line, id);
        });

        Object.keys(linesKeysMap).forEach((line, i) => {
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
                line
            );
        });
    };

    render() {
        return (
            <div key="divCurve" className={styles.pathContainer}>
                <svg
                    key="svgCurve"
                    ref={this.pathContainer}
                    className={styles.pathContainer}
                />
            </div>
        );
    }
}

export default LineRenderer2;
