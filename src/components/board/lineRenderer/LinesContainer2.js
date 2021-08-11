import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import {
    setStart,
    setEnd,
    finishDraw,
    savePin,
    saveLineId,
    updatePinEnd,
    setDragablePin,
} from '../../../actions/lines_actions';
import LineRenderer2 from '../lineRenderer/LineRenderer2';
import Pin from './Pin';
import style from './lineRenderer.css';
import { calcCoordsRelativeToContainer } from '../../../utils/linesUtils';

class LinesContainer2 extends React.Component {
    constructor(props) {
        super(props);
        this.pathContainer = React.createRef();
    }

    componentDidMount() {
        this.setState({
            container: this.pathContainer.current,
        });
    }

    createLineId = (start, end, callback) => {
        const lineId = nanoid(8);
        const points = {
            start,
            end,
        };
        callback(lineId, points);
    };

    handleMouseDown = (event) => {
        if (!this.props.pinMode) return;
        const {
            onSetStart,
            onSetEnd,
            onSavePin,
            onSaveLineId,
            onSetDragablePin,
        } = this.props;

        const startPinId = nanoid(8);
        const endPinId = nanoid(8);
        const coords = calcCoordsRelativeToContainer(
            this.state.container,
            event.clientX,
            event.clientY
        );
        onSetStart(startPinId, coords);
        onSetEnd(endPinId, coords);
        onSavePin(startPinId, coords);
        onSavePin(endPinId, coords);
        onSetDragablePin(endPinId);
        this.createLineId(startPinId, endPinId, onSaveLineId);
    };

    handleMouseMove = (event) => {
        const { linesData } = this.props;
        const { endPoint } = linesData;
        if (!linesData.drawing) return;

        const coords = calcCoordsRelativeToContainer(
            this.state.container,
            event.clientX,
            event.clientY
        );
        this.props.onSetEnd(linesData.endPoint.id, coords);
        this.props.onUpdatePinEnd(endPoint.id, coords);
    };

    handleMouseUp = (event) => {
        if (!this.props.pinMode) return;
        const { endPoint } = this.props.linesData;
        const { onSetEnd, onSetDragablePin } = this.props;
        const coords = calcCoordsRelativeToContainer(
            this.state.container,
            event.clientX,
            event.clientY
        );
        onSetEnd(endPoint.id, coords);
        onSetDragablePin(null);
        this.props.onFinishDraw();
    };

    render() {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                className={`${style.linesContainer} droppable `}
                ref={this.pathContainer}
            >
                {Object.keys(this.props.linesData.pins).map((pin) => {
                    return (
                        <Pin
                            key={pin}
                            position={this.props.linesData.pins[pin]}
                            draggablePin={this.props.linesData.draggablePin}
                            id={pin}
                        />
                    );
                })}

                {this.props.children}
                <LineRenderer2 linesData={this.props.linesData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        linesData: state.lines,
        pinMode: state.picturesBoardData.pinMode,
        isEditing: state.picturesBoardData.isEditing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetStart: (id, coords) => dispatch(setStart(id, coords)),
        onSetEnd: (id, coords) => dispatch(setEnd(id, coords)),
        onFinishDraw: () => dispatch(finishDraw()),
        onSavePin: (pinId, coords) => dispatch(savePin(pinId, coords)),
        onSaveLineId: (lineId, coords) => dispatch(saveLineId(lineId, coords)),
        onUpdatePinEnd: (id, coords) => dispatch(updatePinEnd(id, coords)),
        onSetDragablePin: (id) => dispatch(setDragablePin(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesContainer2);
