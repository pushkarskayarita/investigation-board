import React from 'react';
import style from './EditPanel.css';
import { connect } from 'react-redux';
import AddPinButton from './AddPinButton';
import DeleteElementButton from './DeleteElementButton';
import ResizeElementButton from './ResizeElementButton';
import { addPin, doneEditing } from '../../actions/drag_and_drop_actios';
import DoneButton from './DoneButton';
import CancelButton from './CancelButton';

const EditPanel = ({
    activeElement,
    onAddPin,
    pinMode,
    onDoneEditing,
    isEditing,
}) => {
    const renderMainButtons = () => {
        return (
            <>
                <AddPinButton
                    onAddPin={onAddPin}
                    name="Add connection"
                    icon="addPinIcon"
                />
                <ResizeElementButton name="Resize" icon="resizeIcon" />
                <DeleteElementButton name="Delete" icon="deleteIcon" />
            </>
        );
    };
    if (!activeElement) {
        return <div className={style.panel}>NO selected element</div>;
    }
    return (
        <div className={style.panel}>
            {isEditing ? (
                <div style={{ marginLeft: 'auto' }}>
                    <DoneButton
                        onAddPin={onAddPin}
                        handler={onDoneEditing}
                        name="Done"
                    />
                    <CancelButton name="Cancel" />
                </div>
            ) : (
                renderMainButtons()
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeElement: state.picturesBoardData.activeElement,
        pinMode: state.picturesBoardData.pinMode,
        isEditing: state.picturesBoardData.isEditing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPin: (data) => dispatch(addPin(data)),
        onDoneEditing: () => dispatch(doneEditing()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
