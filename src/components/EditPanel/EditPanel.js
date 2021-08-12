import React from 'react';
import { connect } from 'react-redux';
import style from './EditPanel.css';
import AddPinButton from './AddPinButton';
import DeleteElementButton from './DeleteElementButton';
import ResizeElementButton from './ResizeElementButton';
import { doneEditing, addConnection } from '../../actions/edit_panel_actions';

import DoneButton from './DoneButton';
import CancelButton from './CancelButton';
import EditPanelButton from './EditPanelButton';

const EditPanel = ({
    activeElement,
    onAddConnection,
    onDoneEditing,
    isEditing,
}) => {
    const renderMainButtons = () => {
        return (
            <>
                <AddPinButton
                    onAddPin={onAddConnection}
                    name="Add connection"
                    icon="addPinIcon"
                />
                <EditPanelButton
                    handler={() => console.log('Button universal')}
                    name="Delete connection"
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
                        onAddPin={onAddConnection}
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
        pinMode: state.editPanel.pinMode,
        isEditing: state.editPanel.isEditing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddConnection: (data) => dispatch(addConnection(data)),
        onDoneEditing: () => dispatch(doneEditing()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
