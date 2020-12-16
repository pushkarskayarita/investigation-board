import React, { Component } from 'react';
import styles from './lineRenderer.css';
import { drawLine, lines } from '../../../helpers/d3helpers';

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
        const { mousePositions } = this.props;
        if (prevProps.mousePositions !== mousePositions) {
            this.renderLines();
        }
    }

    renderLines = () => {
        const { mousePositions } = this.props;

        mousePositions.forEach((position, i) => {
            lines[i] = drawLine(
                this.state.container,
                position.x1,
                position.y1,
                position.x2,
                position.y2,
                i
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

export default LineRenderer;
