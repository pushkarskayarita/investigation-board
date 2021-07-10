import React from 'react';
import { connect } from 'react-redux';
import style from './Board.css';
import LineRenderer from './lineRenderer/LineRenderer';


function createPosition(x1, y1, x2, y2) {
    return { x1, y1, x2, y2 };
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.pathContainer = React.createRef();
        this.state = {
            container: null,
            drawing: false,
            mousePositions: [],
        };
    }

    componentDidMount() {
        this.setState({
            container: this.pathContainer.current,
        });
    }

    handleMouseDown = (event) => {
        this.setState({
            drawing: true,
        });
        const { container } = this.state;
        const containerCoords = container.getBoundingClientRect();
        const { clientX, clientY } = event;
        const left = clientX - containerCoords.left - container.clientLeft;
        const top = clientY - containerCoords.top - container.clientTop;
        const position = createPosition(left, top, left, top);
        this.setState((prevstate) => {
            return {
                mousePositions: [...prevstate.mousePositions, position],
            };
        });
    };

    handleMouseMove = (event) => {
        if (!this.state.drawing) return;

        const { container } = this.state;
        const containerCoords = container.getBoundingClientRect();

        const { clientX, clientY } = event;
        const index = this.state.mousePositions.length - 1;
        const { x1, y1 } = this.state.mousePositions[index];

        const left = clientX - containerCoords.left - container.clientLeft;
        const top = clientY - containerCoords.top - container.clientTop;

        const updatePosition = createPosition(x1, y1, left, top);

        const mousePositionsCopy = [...this.state.mousePositions];
        mousePositionsCopy[index] = updatePosition;
        this.setState({
            mousePositions: mousePositionsCopy,
        });
    };

    handleMouseUp = () => {
        this.setState({
            drawing: false,
        });
    };

    render() {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                className={style.containerBoard}
                ref={this.pathContainer}
            >
                <LineRenderer mousePositions={this.state.mousePositions} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { picturesBoard: state.picturesBoardData.picturesBoard };
};

export default connect(mapStateToProps)(Board);
