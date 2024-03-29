import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import UploadForm from '../upload/UploadForm';
import style from './MenuPanel.css';
import UploadedPicturesList from '../upload/UploadedPicturesList';
import { addElementToBoard } from '../../actions/board_actios';
import { templates, componentsNames } from '../../utils/templates';

const MenuPanel = (props) => {
    const { containerRef } = props.containerRef;
    const handleDragStart = (event, id, imageSrc, elementName, list) => {
        const coords = event.target.getBoundingClientRect();
        props.onAddElementToBoard({
            id: nanoid(8),
            dragStartPositions: {
                top: coords.top,
                left: coords.left,
                clientX: event.clientX,
                clientY: event.clientY,
            },
            imageSrc,
            elementName,
            list,
            coords: {},
            loadedPictureFileId: '',
        });
    };

    return (
        <div className={style.container}>
            <div className={style.templatesContainer}>
                <span>Templates</span>
                <ul className={style.templates}>
                    {templates.map((template, index) => {
                        const Template = template[componentsNames[index]];
                        return (
                            <li
                                draggable={true}
                                key={template.id}
                                className={style.templateItem}
                                onDragStart={(event) => {
                                    event.preventDefault();
                                    handleDragStart(
                                        event,
                                        template.id,
                                        template.imageSrc,
                                        componentsNames[index],
                                        'templatesBoard'
                                    );
                                }}
                            >
                                <Template
                                    scaleFactor={template.scaleFactor}
                                    imagePlaceholder={false}
                                    isOnBoard={false}
                                    imageSrc={template.imageSrc}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <UploadForm />
            <UploadedPicturesList containerRef={containerRef} />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddElementToBoard: (data) => dispatch(addElementToBoard(data)),
    };
};

export default connect(null, mapDispatchToProps)(MenuPanel);
