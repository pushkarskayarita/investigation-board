import React from 'react';
import { connect } from 'react-redux';
import { updatePinPosition } from '../../actions/lines_actions';
import { calcCoordsRelativeToContainer } from '../../utils/linesUtils';
import style from '../board/lineRenderer/lineRenderer.css';

let sharedHandler = null;
const pinWidth = 25;
const pinHeight = 25;
let currentTopPosition;
let currentLeftPosition;

class DraggableForPinClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                left: this.props.pinPosition.x || 0,
                top: this.props.pinPosition.y || 0,
            },
        };

        this.elemRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pinPosition !== this.props.pinPosition) {
            this.setState({
                position: {
                    left: this.props.pinPosition.x,
                    top: this.props.pinPosition.y,
                },
            });
        }
    }

    moveAt = (event) => {
        currentLeftPosition =
            event.clientX -
            this.props.containerRef.getBoundingClientRect().left;
        currentTopPosition =
            event.clientY - this.props.containerRef.getBoundingClientRect().top;
        this.setState({
            position: {
                left: currentLeftPosition,
                top: currentTopPosition,
            },
        });
    };

    onDragStart = (event) => {
        this.moveAt(event);
        if (sharedHandler) {
            document.removeEventListener('mousemove', sharedHandler);
        }
        // eslint-disable-next-line no-use-before-define
        sharedHandler = this.handleMouseMove;
        // eslint-disable-next-line no-use-before-define
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', sharedHandler);
    };

    handleMouseDown = (event) => {
        if (this.props.pinMode) return;
        if (event.target.className !== style.pin) {
            return;
        }

        this.onDragStart(event, false);
    };

    handleMouseMove = (event) => {
        this.moveAt(event);
        const coords = calcCoordsRelativeToContainer.call(
            this,
            this.props.containerRef,
            event.clientX,
            event.clientY
        );

        this.props.onUpdatePinPosition(this.props.id, coords);
    };

    handleMouseUp = (event) => {
        const coords = calcCoordsRelativeToContainer.call(
            this,
            this.props.containerRef,
            event.clientX,
            event.clientY
        );

        this.props.onUpdatePinPosition(this.props.id, coords);
        document.removeEventListener('mousemove', sharedHandler);
        document.removeEventListener('mouseup', this.handleMouseUp);
        sharedHandler = null;
    };

    render() {
        return (
            <>
                <div
                    ref={this.elemRef}
                    style={{
                        position: 'absolute',
                        zIndex: 700,
                        left: this.state.position
                            ? `${this.state.position.left - pinWidth / 2}px`
                            : undefined,
                        top: this.state.position
                            ? `${this.state.position.top - pinWidth / 2}px`
                            : undefined,
                        // border: '2px solid black',
                        width: pinWidth,
                        height: pinHeight,
                    }}
                    onDragStart={(event) => event.preventDefault()}
                    onMouseDown={this.handleMouseDown}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pinMode: state.editPanel.pinMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePinPosition: (id, coords) =>
            dispatch(updatePinPosition(id, coords)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraggableForPinClass);
