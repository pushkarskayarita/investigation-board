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
    setDrawingPin,
    updatePinPosition,
} from '../../../actions/lines_actions';
import LineRenderer from './LineRenderer';
import Pin from './Pin';
import style from './lineRenderer.css';
import { calcCoordsRelativeToContainer } from '../../../utils/linesUtils';
import { selectElement } from '../../../actions/board_actios';
import DraggableForPinClass from '../../drag/DraggableForPinClass';

class LinesContainer extends React.Component {
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
        if (this.props.deleteConnection) {
            return;
        }
        if (!this.props.pinMode) return;
        const {
            onSetStart,
            onSetEnd,
            onSavePin,
            onSaveLineId,
            onSetDrawingPin,
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
        onSetDrawingPin(endPinId);
        this.createLineId(startPinId, endPinId, onSaveLineId);
    };

    handleMouseMove = (event) => {
        if (!this.props.pinMode || this.props.deleteConnection) return;

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
        const { onSetEnd, onSetDrawingPin } = this.props;
        const coords = calcCoordsRelativeToContainer(
            this.state.container,
            event.clientX,
            event.clientY
        );
        onSetEnd(endPoint.id, coords);
        onSetDrawingPin(null);
        this.props.onFinishDraw();
    };

    render() {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                onDragStart={(event) => event.preventDefault()}
                className={`${style.linesContainer} droppable `}
                ref={this.pathContainer}
            >
                <ul>
                    {Object.keys(this.props.linesData.pins).map((pin) => {
                        return (
                            <DraggableForPinClass
                                key={pin}
                                id={pin}
                                containerRef={this.state.container}
                                pinPosition={this.props.linesData.pins[pin]}
                            >
                                <Pin
                                    // key={pin}
                                    position={this.props.linesData.pins[pin]}
                                    draggablePin={
                                        this.props.linesData.draggablePin
                                    }
                                    id={pin}
                                />
                            </DraggableForPinClass>
                        );
                    })}
                </ul>

                <LineRenderer
                    linesData={this.props.linesData}
                    pinMode={this.props.pinMode}
                    onSelectLine={this.props.onSelectLine}
                    onSelectElement={this.props.onSelectElement}
                />
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        linesData: state.lines,
        pinMode: state.editPanel.pinMode,
        isEditing: state.editPanel.isEditing,
        deleteConnection: state.editPanel.deleteConnection,
        editPanel: state.editPanel,
        activeElement: state.boardData.activeElement,
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
        onUpdatePinPosition: (id, coords) =>
            dispatch(updatePinPosition(id, coords)),
        onSetDrawingPin: (id) => dispatch(setDrawingPin(id)),
        onSelectElement: (id, list) => dispatch(selectElement(id, list)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesContainer);
