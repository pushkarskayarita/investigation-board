import React from 'react';
import { connect } from 'react-redux';
import style from './EditPanel.css';
import { doneEditing, addLink } from '../../actions/edit_panel_actions';
import { deleteRelatedPins } from '../../actions/lines_actions';
import { deleteElementFromBoard } from '../../actions/board_actios';
import { removePath } from '../../helpers/d3helpers';
import { isObjEmpty } from '../../utils/checkIsEmpty';
import EditPanelButton from './EditPanelButton';

const EditPanel = ({
    activeElement,
    isEditing,
    selectedLine,
    onAddLink,
    onDoneEditing,
    onDeleteElementFromBoard,
    onDeleteRelatedPins,
}) => {
    const renderMainButtons = () => {
        return (
            <>
                <EditPanelButton handler={onAddLink} name="Add link" />
                <EditPanelButton handler={() => {}} name="Resize" />
                <EditPanelButton
                    handler={() => {
                        if (selectedLine) {
                            onDeleteRelatedPins(selectedLine);
                        }
                        onDeleteElementFromBoard(
                            activeElement.id,
                            activeElement.list
                        );
                        removePath(selectedLine);
                    }}
                    name="Delete"
                    pushRight={true}
                />
            </>
        );
    };
    if (isObjEmpty(activeElement)) {
        return <div className={style.panel} />;
    }
    return (
        <div className={style.panel}>
            {isEditing ? (
                <div style={{ marginLeft: 'auto' }}>
                    <EditPanelButton handler={onDoneEditing} name="Done" />
                    <EditPanelButton handler={() => {}} name="Cancel" />
                </div>
            ) : (
                renderMainButtons()
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeElement: state.boardData.activeElement,
        pinMode: state.editPanel.pinMode,
        isEditing: state.editPanel.isEditing,
        selectedLine: state.lines.selectedLine,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddLink: (data) => dispatch(addLink(data)),
        onDoneEditing: () => dispatch(doneEditing()),
        onDeleteElementFromBoard: (id, list) =>
            dispatch(deleteElementFromBoard(id, list)),
        onDeleteRelatedPins: (lineId) => dispatch(deleteRelatedPins(lineId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
